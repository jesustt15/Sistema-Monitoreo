
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Config = sequelize.define('configs', {
  
  config_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailSend: {
    type: DataTypes.STRING,
    allowNull: false,
  },


  
});

module.exports = Config;