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
        defaultValue: null,
        allowNull: true,
    },
    lastName: {
        type: Sequelize.STRING, 
        defaultValue: null,
        allowNull: true,     
    },
    nickName: {
        type: Sequelize.STRING,      
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,      
        allowNull: false,
        unique: true
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
        type: Sequelize.ARRAY(Sequelize.INTEGER),   //array con las id de los que siguen al user
        defaultValue: [],     
        allowNull: true
    },
    following: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),   //array con las id de los que sigue el user
        defaultValue: [],
        allowNull: true,
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
        defaultValue: null,
        allowNull: true,   
    },
    profilePicture: {
        type: Sequelize.STRING,   
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