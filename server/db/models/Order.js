// Import Sequelize and define your database connection
const {DataTypes} = require('sequelize');
const db = require('../db');

// Define the "orders" model
const Order = db.define('order', {
  isCart: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  transactionID: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cartItems: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: true,
  },
  checkout: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
