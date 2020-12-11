const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Hero = sequelize.define("hero", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  image: Sequelize.STRING,
});

module.exports = Hero;
