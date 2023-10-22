const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecom", "root", "Sunil2328@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
