const Sequelize = require('sequelize')
const db = require ('../db')


const Dog = db.define('dog', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING
  },
  sponsorFee: {
    type: Sequelize.INTEGER
  },
  gender: {type: Sequelize.STRING
  },
  imageURL: {
    type: Sequelize.STRING
  }
})

module.exports = Dog
