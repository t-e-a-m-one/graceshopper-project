const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define(
  "product",
  {
    // One user ; many products
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM({ values: ["food", "clothing", "electronics"] }),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "DEFAULT DESCRIPTION",
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "https://place-hold.it/150x150",
    },
    inStock: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    hooks: {
      beforeValidate: (product) => {
        if (product.quantity !== 0) {
          product.inStock = true;
        }
      },
    },
  }
);

module.exports = Product;
