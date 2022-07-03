const sequelize = require('../sequelize.js');
const { DataTypes } = require('sequelize');

//feedback ul este acordat de catre studenti
const Feedback=sequelize.define('feedback',{
  
    emoji:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=Feedback;