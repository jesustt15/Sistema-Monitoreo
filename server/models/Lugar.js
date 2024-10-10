// const {Schema, model, SchemaTypes} = require('mongoose');


// const lugarSchema = Schema({
//     name:{
//         type:String,
//         required: true
//     },
//     tempMin: {
//         type: Number,
        
//     },
//     tempMax: {
//         type: Number,
//         validate: {
//             validator: function(value) {
//               return value >= this.tempMin;
//             },
//             message: 'La temperatura máxima debe ser mayor o igual a la temperatura mínima'
//           }
        
        
//     },
//     humMin:{
//         type: Number,
//     },
//     humMax:{
//         type: Number,
//         validate: {
//             validator: function(value) {
//               return value >= this.humMin;
//             },
//             message: 'La humedad máxima debe ser mayor o igual a la humedad mínima'
//           }
//     },
// })

// module.exports = model('Lugar', lugarSchema);

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lugar = sequelize.define('lugares', {
  
  lugar_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tempMin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tempMax: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humMin: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  humMax: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  
});

module.exports = Lugar;
