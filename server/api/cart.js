const { Cart } = require('../db/index');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    
    const cartItems = await Cart.findAll();
    console.dog("api/cart:",cartItems)
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});
//Missing Post
// router.post('/', async (req, res, next) =>  {
//   try {

//   } catch (error) {

//   }
// })

// router.post

module.exports = router;
