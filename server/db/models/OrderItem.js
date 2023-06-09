const Sequelize = require("sequelize");
const db = require("../db");
const OrderItem = db.define("orderItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = OrderItem;
