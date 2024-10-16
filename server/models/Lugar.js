
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

Lugar.addHook('beforeValidate', (lugar, options) => {
  if (lugar.tempMin >= lugar.tempMax) {
    throw new Error('La temperatura mínima no puede ser mayor o igual a la máxima');
  }
});

Lugar.addHook('beforeValidate', (lugar, options) => {
  if (lugar.humMin >= lugar.humMax) {
    throw new Error('La Humedad mínima no puede ser mayor o igual a la máxima');
  }
});


module.exports = Lugar;
