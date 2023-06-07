//this is the access point for all things database related!
const { Sequelize, DataTypes } = require('sequelize')
const db = require('./db')

const User = require('./models/User')
const Dog = require("./models/Dog")

//associations could go here!

//Added this line below
// User.belongsTo(Dog, { foreignKey: 'id', as: 'dog' });
// Dog.hasMany(User, { foreignKey: 'id', as: 'users' });

User.belongsTo(Dog, { foreignKey: 'dogId', as: 'dog' });
Dog.hasMany(User, { foreignKey: 'dogId', as: 'users' });

module.exports = {
  db,
  Dog,
  models: {
    User,
  },
}
