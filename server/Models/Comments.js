const db = require('../Database/connection');
const Sequelize = require('sequelize');

const VoxComments = db.define('VoxComments', {
    commentId: {
        type: Sequelize.INTEGER, // Tipo de dato.
        autoIncrement: true,     // ID autoincremental.
        primaryKey: true,        // Primary Key set.
        allowNull: false         // No nulleable.
    },
    content: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING, 
        defaultValue: null,
        allowNull: true,     
    },
  });

module.exports = VoxComments;