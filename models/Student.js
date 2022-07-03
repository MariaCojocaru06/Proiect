const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

const Student = sequelize.define('student', {
    id: {
        type: DataTypes.INTEGER,
       // defaultValue: DataTypes.UUIDV4,
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

module.exports = Student;