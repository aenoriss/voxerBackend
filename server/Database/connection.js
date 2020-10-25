const Sequelize = require('sequelize');

const db = new Sequelize('comunitradeDB', 'postgres', '12345678', {
  host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    define: {
      timestamps: false
    },    
    logging:false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

module.exports = db