const Sequelize = require('sequelize');

module.exports = new Sequelize('comunitradeDB', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    define: {
      timestamps: false
    },
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });