const Sequelize = require('sequelize');

const sequelize = new Sequelize('pedidos', 'root', '123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
