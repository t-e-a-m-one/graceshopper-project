//this is the access point for all things database related!
const { Sequelize, DataTypes } = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Dog = require("./models/Dog")
const Order = require('./models/Order')
const Cart = require('./models/Cart')

//associations could go here!
User.hasMany(Order); // A user can have multiple orders

Order.belongsTo(User); // An order belongs to a user
Order.belongsToMany(Dog, { through: 'Cart', as: 'orderDogs' }); // An order can have multiple dogs
Order.hasOne(Cart, { foreignKey: 'orderId' });

Dog.belongsToMany(Order, { through: 'Cart', as: 'dogOrders' }); // A dog can be in multiple orders through the cart

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Dog, { foreignKey: 'dogId' });
Cart.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = {
  db,
  Dog,
  Cart,
  models: {
    User,
    Order,
  },
}
