const {Sequelize} = require('sequelize')
const {db} = require('../db')

const Cart = db.define('Cart', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  dogId: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Cart.beforeSave(async (cart) => {
  const dog = await cart.getDog();
  if (dog) {
    cart.totalCost = dog.sponsorFee * cart.quantity; 
  }
})

module.exports = Cart;
