const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname'); // URI de la DB.

// Testea la conexión de Sequelize.
export var Status = function() {
    try {
        let status = false;
        
        if(await sequelize.authenticate()) { 
            status = true; 
        }

        return status;
        
    } catch(error){
        console.log("Error en la autenticación: " + error);
    }
}