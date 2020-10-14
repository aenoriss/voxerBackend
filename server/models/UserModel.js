const User = sequelize.define('User', {
    userId: {
        type: Sequelize.INTEGER, // Tipo de dato.
        autoIncrement: true,     // ID autoincremental.
        primaryKey: true,        // Primary Key set.
        allowNull: false         // No nulleable.
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    DNI: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    registerDate: {
        type: Sequelize.DATE,      
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    birthDay: {
        type: Sequelize.DATE,      
        allowNull: false
    },
    followers: {
        type: Sequelize.INTEGER,      
        allowNull: false,
        defaultValue: 0
    },
    following: {
        type: Sequelize.INTEGER,      
        allowNull: false,
        defaultValue: 0
    }
  });