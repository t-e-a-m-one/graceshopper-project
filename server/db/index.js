//this is the access point for all things database related!
const { Sequelize, DataTypes } = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Dog = require("./models/Dog")
const Order = require('./models/Order')

//associations could go here!

//Added this line below

// User.belongsTo(Dog, { foreignKey: 'dogId', as: 'dog' });
// Dog.hasMany(User);

Order.belongsTo(User); // An order belongs to a user
Order.belongsToMany(Dog, { through: 'OrderDog' }); // An order can have multiple dogs

// In your User model file:
User.hasMany(Order); // A user can have multiple orders

// In your Dog model file:
Dog.belongsToMany(Order, { through: 'OrderDog' }); // A dog can be in multiple orders

module.exports = {
  db,
  Dog,
  models: {
    User,
    Order
  },
}
