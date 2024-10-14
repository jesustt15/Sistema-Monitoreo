const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Valores = require('./Valores');
const Lugar = require('./Lugar');

const Hist_Value = sequelize.define('hist_values', {
  
  hist_value_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  value_id: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: Valores,
    key: 'value_id',
  }
  }
  
});

Valores.hasMany(Hist_Value, { foreignKey: 'value_id' }),
Hist_Value.belongsTo(Valores, { foreignKey: 'value_id'});

Valores.belongsTo(Lugar, { foreignKey: 'lugar_id' });

module.exports = Hist_Value;
