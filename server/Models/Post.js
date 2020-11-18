const db = require('../Database/connection');
const Sequelize = require('sequelize');

const Post = db.define('Post', {
    postId: {
        type: Sequelize.INTEGER, // Tipo de dato.
        autoIncrement: true,     // ID autoincremental.
        primaryKey: true,        // Primary Key set.
        allowNull: false         // No nulleable.
    },
    Content: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
    },
    Image: {
        type: Sequelize.STRING, 
        defaultValue: null,
        allowNull: true,     
    },
  });

module.exports = Post;