const {Sequelize}  = require('sequelize')
const db = require ('../db')


const Dog = db.define('dog', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true
  //   }
  // },
  name: {
    type: Sequelize.STRING
  },
  sponsorFee: {
    type: Sequelize.INTEGER
  },
  gender: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:'https://picsum.photos/200/300'
  }
});

module.exports = Dog;



// const { Sequelize, DataTypes, Model } = require('sequelize');
// const db = require('../db');

// class Dog extends Model {}

// Dog.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     sponsorFee: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     imageURL: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     modelName: 'dog',
//   }
// );

// module.exports = Dog;
