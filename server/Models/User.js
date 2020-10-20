const Sequelize = require('sequelize');
const db = require('../Database/connection');

const User = db.define('User', {
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
    },
    salt: {
        type: Sequelize.STRING,      
        allowNull: false
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