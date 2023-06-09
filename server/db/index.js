// This is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const OrderItem = require("./models/OrderItem");

// User-Cart: One-to-Many
User.hasMany(Cart);
Cart.belongsTo(User);

// Cart-OrderItem: One-to-many
Cart.hasMany(OrderItem);
OrderItem.belongsTo(Cart);

// Product-OrderItem: One-to-many
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    OrderItem,
  },
};
