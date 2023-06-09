const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  totalCost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
  },
  totalCartItems: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Pending", "Completed"),
    defaultValue: "Pending",
    allowNull: false,
  },
});

module.exports = Cart;
