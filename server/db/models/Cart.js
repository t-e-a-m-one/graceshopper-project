const { DataTypes } = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});



module.exports = Cart;
