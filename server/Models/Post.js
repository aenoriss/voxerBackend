import Comment from "./Comments"

const db = require('../Database/connection');
const Sequelize = require('sequelize');

const VoxPosts = db.define('VoxPosts', {
    postId: {
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

VoxPosts.hasMany(Comment, { as: "comments" });
Comment.belongsTo(VoxPosts, {
});

module.exports = VoxPosts;