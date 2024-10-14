
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
    allowNull: true,
  },
   

});

//hooks
// Define el hook después de la creación del modelo
Valores.beforeCreate((valores) => {
  valores.valueFecha = new Date().toISOString(); // Asigna la fecha actual antes de crear el registro
});


//Relaciones
Lugar.hasMany(Valores, { foreignKey: 'lugar_id' }),
Valores.belongsTo(Lugar, { foreignKey: 'lugar_id'});

module.exports = Valores;
