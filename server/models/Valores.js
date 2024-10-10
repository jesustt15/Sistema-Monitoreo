
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lugar = require('./Lugar');

const Valores = sequelize.define('valores', {
  
  valor_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  lugar_id: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: Lugar,
    key: 'lugar_id',
  }
},
  tempValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  humValue: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  valueFecha: {
    type: DataTypes.DATE,
    deafault: DataTypes.NOW,
    allowNull: false,
  },


  
});

Lugar.hasMany(Valores, { foreignKey: 'lugar_id' }),
Valores.belongsTo(Lugar, { foreignKey: 'lugar_id'});

module.exports = Valores;
