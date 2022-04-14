const { Sequelize } = require("sequelize");
const connection = new Sequelize(
  "scholarApi",
  "postgres",
  "admin",
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      idle: 10000,
      max: 30,
      min: 1,
      acquire: 30000,
    },
  
  }

);

//connection.sync({force: true});

module.exports = connection;