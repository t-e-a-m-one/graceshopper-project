const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const {
  db,
  models: { User, Cart, OrderItem, Product },
} = require("../db");

const createOrderItem = async (qty, prodPrice) => {
  return await OrderItem.create({ quantity: qty, total: qty * prodPrice });
};

const findTotalCartCostQty = async (cartId) => {
  let totalCartCostQty = await OrderItem.findAll({
    attributes: [
      "cartId",
      [sequelize.fn("sum", sequelize.col("total")), "total"],
      [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
    ],
    group: ["cartId"],
    raw: true,
  });
  if (totalCartCostQty.length > 0) {
    for (const orderItem of totalCartCostQty) {
      if (orderItem.cartId === cartId) {
        return {
          totalCartCost: orderItem.total,
          totalCartQty: orderItem.quantity,
        };
      }
    }
  }
};

const updateCart = async (cart, totalCartCost, totalCartQty) => {
  return await cart.update(
    {
      totalCost: totalCartCost,
      totalCartItems: totalCartQty,
    },
    {
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["prodName", "prodPrice"],
            },
          ],
        },
      ],
    }
  );
};

const updateExistingProd = async (cart, userProd, newQuantity) => {
  let updateProd = false;
  let updateOrderItem, updateOrderItemQty;
  const existingOrderItems = await cart.getOrderItems();
  for (const orderItem of existingOrderItems) {
    const existingProduct = await orderItem.getProduct();
    if (existingProduct.id === userProd.id) {
      updateProd = true;
      updateOrderItem = orderItem;
      updateOrderItemQty = orderItem.quantity;
      break;
    }
  }
  if (updateProd) {
    await updateOrderItem.update({
      quantity: updateOrderItemQty + newQuantity,
      total: newQuantity * userProd.prodPrice,
    });
  } else {
    const newOrderItem = await createOrderItem(newQuantity, userProd.prodPrice);
    await newOrderItem.setProduct(userProd);
    await newOrderItem.setCart(cart);
  }
};

router.post("/", async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const prodId = req.body.prodId;
    const qty = req.body.quantity ? req.body.quantity : 1;

    const user = await User.findByPk(userId);
    const prod = await Product.findByPk(prodId);

    if (qty > prod.prodQuantity) {
      res.sendStatus(404);
      return; // user quantity exceeds the available product quantity
    }

    const pendingCart = await user.getCarts({
      where: {
        status: "Pending",
      },
    });
    const isCartActive = pendingCart.length === 0;
    let cart;

    if (isCartActive) {
      cart = await Cart.create();
      await cart.setUser(user);
    } else {
      [cart] = pendingCart;
    }

    const existingOrderItems = await cart.getOrderItems();
    if (existingOrderItems.length > 0) {
      await updateExistingProd(cart, prod, qty);
    } else {
      const orderItem = await createOrderItem(qty, prod.prodPrice);
      await orderItem.setProduct(prod);
      await orderItem.setCart(cart);
    }

    const { totalCartCost, totalCartQty } = await findTotalCartCostQty(cart.id);
    const updatedCart = await updateCart(cart, totalCartCost, totalCartQty);

    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (userId) {
      const user = await User.findByPk(userId);
      const [userCart] = await user.getCarts({
        where: {
          status: "Pending",
        },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
              },
            ],
          },
        ],
      });
      res.status(200).json(userCart);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:orderItemId", async (req, res, next) => {
  try {
    const orderItemId = req.params.orderItemId;
    const userQuantity = req.body.qty;

    const orderItem = await OrderItem.findByPk(orderItemId);
    const cart = await orderItem.getCart();
    const product = await orderItem.getProduct();

    if (userQuantity > product.prodQuantity) {
      res.sendStatus(404);
      return; // user quantity exceeds the available product quantity
    }

    const updatedOrderItem = await orderItem.update({
      quantity: req.body.qty,
      total: req.body.qty * req.body.prodPrice,
    });

    const { totalCartCost, totalCartQty } = await findTotalCartCostQty(cart.id);
    await updateCart(cart, totalCartCost, totalCartQty);

    res.json(updatedOrderItem);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const orderItemId = req.query.orderItemId;
    const orderItem = await OrderItem.findByPk(orderItemId);
    const cart = await orderItem.getCart();
    await orderItem.destroy();
    const totalCartCostQty = await findTotalCartCostQty(cart.id);
    const totalCartCost = totalCartCostQty?.totalCartCost;
    const totalCartQty = totalCartCostQty?.totalCartQty;
    let updatedCart;
    if (totalCartCostQty) {
      updatedCart = await updateCart(cart, totalCartCost, totalCartQty);
    } else {
      updatedCart = updateCart(cart, 0, 0);
    }

    res.send(orderItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
