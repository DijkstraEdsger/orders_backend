const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
});

module.exports = Cart;
