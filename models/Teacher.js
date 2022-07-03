const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');
const Course = require('./Course.js');

const Teacher = sequelize.define('teacher', {
    id: {
        type: DataTypes.INTEGER,
        
        primaryKey: true
    },    
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialization:{
        type: DataTypes.STRING,
        allowNull: false

    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true,
        }

    },
    password:{
        type:DataTypes.STRING
    }

});

module.exports = Teacher;