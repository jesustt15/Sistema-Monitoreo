
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
