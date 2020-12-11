const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
});

module.exports = Order;
