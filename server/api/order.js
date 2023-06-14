const express = require("express");
const router = express.Router();
const { Order } = require("../db/models/Order");

// POST /api/orders
router.post("/", async (req, res, next) => {
  try {
    console.log("Order route accessed");
    const { items, checkout } = req.body;

    // Create a new order in the database
    const order = await Order.create({
      items,
      checkout,
    });

    // Send the created order as the API response
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
