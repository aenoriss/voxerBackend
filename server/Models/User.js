const db = require('../Database/connection');
const Sequelize = require('sequelize');
const crypto = require('crypto');

const User = db.define('User', {
    userId: {
        type: Sequelize.INTEGER, // Tipo de dato.
        autoIncrement: true,     // ID autoincremental.
        primaryKey: true,        // Primary Key set.
        allowNull: false         // No nulleable.
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING, 
        allowNull: false,     
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
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    followers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,     
        allowNull: false
    },
    following: {
        type: Sequelize.INTEGER,      
        allowNull: false,
        defaultValue: 0
    },
    level: {
        type: Sequelize.DOUBLE,  
        defaultValue: 1,    
        allowNull: false
    },
    mentor: {
        type: Sequelize.BOOLEAN,  
        defaultValue: false,    
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,   
    },
    profilePicture: {
        type: Sequelize.BLOB,  
        defaultValue: null, 
        allowNull: true,  
    },
    salt: {
        type: Sequelize.STRING
    },
  });

User.addHook( 'beforeCreate' , (user) =>{
    user.salt = crypto.randomBytes(20).toString('hex')
    user.password = user.hashPassword(user.password);
})

User.prototype.hashPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.prototype.validPassword = function (password) {
    return this.password === this.hashPassword(password)
};

module.exports = User;