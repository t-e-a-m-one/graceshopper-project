const { Sequelize } = require("sequelize");
const db = require("../db");

const Dog = db.define("dog", {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   allowNull: false,
  //   validate: {
  //     notEmpty: true
  //   }
  // },
  name: {
    type: Sequelize.STRING,
  },
  sponsorFee: {
    type: Sequelize.INTEGER,
  },
  gender: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://placedog.net/640/480?random",
  },
});

module.exports = Dog;
