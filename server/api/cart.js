const express = require("express");
const router = express.Router();
const { Cart } = require("../db");

// get cart by user ID
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findAll({ where: { userId } });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// add item to cart
router.post("/add/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { dogId, quantity } = req.body;

    const cartItem = await Cart.create({ userId, dogId, quantity });
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

// Remove item from cart
router.delete("/:userId/:cartItemId", async (req, res, next) => {
  try {
    const { userId, cartItemId } = req.params;

    await Cart.destroy({ where: { userId, id: cartItemId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Update quantity of an item in the cart
router.put("/:userId/:cartItemId", async (req, res, next) => {
  try {
    const { userId, cartItemId } = req.params;
    const { quantity } = req.body;

    await Cart.update({ quantity }, { where: { userId, id: cartItemId } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
