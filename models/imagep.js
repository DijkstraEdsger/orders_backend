const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Imagep = sequelize.define("imagep", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  image: {
    type: Sequelize.STRING,
  },
});

module.exports = Imagep;
