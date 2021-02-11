const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  name: Sequelize.STRING,
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Category;
