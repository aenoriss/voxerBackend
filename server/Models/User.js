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
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,      
        allowNull: true
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
        allowNull: true,
        defaultValue: Sequelize.NOW
    },
    birthDate: {
        type: Sequelize.DATE,      
        allowNull: true
    },
    followers: {
        type: Sequelize.INTEGER,      
        allowNull: true
    },
    following: {
        type: Sequelize.INTEGER,      
        allowNull: true
    },
    level: {
        type: Sequelize.DOUBLE,      
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,      
        allowNull: true
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