const express = require('express');
const router = express.Router();
const {Cart} = require('../db')


// get cart by user ID
router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findAll({where: {userId}})

    // Retrieve cart data from local storage
    const cartData = localStorage.getItem('cart');
    const parsedCartData = cartData ? JSON.parse(cartData) : [];

    // Merge the cart data from the database and local storage
    const mergedCart = [...cart, ...parsedCartData];

    res.json(mergedCart);
    res.json(cart)
  } catch (error) {
    next (console.log('error conjuring cart!', error))
  }
})


// add item to cart
router.post('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params;
    const {dogId, quantity} = req.body;

    const cartItem = await Cart.create({userId, dogId, quantity})

    // update cart in local storage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      parsedCartData.push(cartItem);
      const updatedCardData = JSON.stringify(parsedCartData);
      localStorage.setItem('cart', updatedCardData)
    } else {
      const initialCartData = JSON.stringify([cartItem]);
      localStorage.setItem('cart', initialCartData)
    }
    res.json(cartItem)
  } catch (error) {
    next(console.log('error ADDING to cart!', error))
  }
})

// Remove item from cart
router.delete('/:userId/:cartItemId', async (req, res, next) => {
  try {
    const { userId, cartItemId } = req.params;
    // Delete the item from the database
    await Cart.destroy({ where: { userId, id: cartItemId } });

    // Update the cart in local storage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      const updatedCartData = parsedCartData.filter(
        (item) => item.id !== cartItemId
      );
      const updatedCartDataJSON = JSON.stringify(updatedCartData);
      localStorage.setItem('cart', updatedCartDataJSON);
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// Update quantity of an item in the cart
router.put('/:userId/:cartItemId', async (req, res, next) => {
  try {
    const { userId, cartItemId } = req.params;
    const { quantity } = req.body;

    // Update quantity in the database
    await Cart.update({ quantity }, { where: { userId, id: cartItemId } });
    res.sendStatus(204);

    // Update the cart in local storage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      const updatedCartData = parsedCartData.map((item) => {
        if (item.cartItemId === cartItemId) {
          return { ...item, quantity };
        }
        return item;
      });
      localStorage.setItem('cart', JSON.stringify(updatedCartData));
    }
  } catch (error) {
    next(console.log('Error UPDATING cart!', error));
  }
});


module.exports = router;
