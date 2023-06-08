//this is the access point for all things database related!
const { Sequelize, DataTypes } = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Dog = require("./models/Dog")
const Cart = require("./models/Cart")

//associations could go here!

//Added this line below

User.belongsTo(Dog, { foreignKey: 'dogId', as: 'dog' });
User.hasMany(Cart, { foreignKey: 'userId' });

Dog.hasMany(User);

Cart.belongsTo(User, {foreignKey: 'userId'});
Cart.belongsTo(Dog, {ForeignKey: 'dogId'})

module.exports = {
  db,
  Dog,
  Cart,
  models: {
    User,
  },
}
