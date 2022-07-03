const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

//grupare de studenti= clasa de studiu
const Group = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
        
    }
})
module.exports=Group

