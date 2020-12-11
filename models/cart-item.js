const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
