const Sequelize = require('sequelize');
const db = require('../Database/connection');

module.exports = db.define('User', {
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
    nickName: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    registerDate: {
        type: Sequelize.DATE,      
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    birthDate: {
        type: Sequelize.DATE,      
        allowNull: false
    },
    followers: {
        type: Sequelize.INTEGER,      
        allowNull: false
    },
    following: {
        type: Sequelize.INTEGER,      
        allowNull: false
    }
  });