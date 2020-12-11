const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Image = sequelize.define("image", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Image;
