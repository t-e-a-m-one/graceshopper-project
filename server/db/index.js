//this is the access point for all things database related!
const { Sequelize, DataTypes } = require("sequelize");
const db = require("./db");

const User = require("./models/User");
const Dog = require("./models/Dog");
const Order = require("./models/Order");

Order.belongsTo(User); // An order belongs to a user
Order.belongsToMany(Dog, { through: "OrderDog" }); // An order can have multiple dogs

User.hasMany(Order); // A user can have multiple orders

Dog.belongsToMany(Order, { through: "OrderDog" }); // A dog can be in multiple orders

module.exports = {
  db,
  Dog,
  models: {
    User,
    Order,
  },
};
