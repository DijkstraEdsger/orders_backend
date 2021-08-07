const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Contact = sequelize.define("contact", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  message: Sequelize.TEXT('long'),
});

module.exports = Contact;
