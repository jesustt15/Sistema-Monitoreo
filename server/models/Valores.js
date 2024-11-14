const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lugar = require('./Lugar');

const Valores = sequelize.define('Valores', {
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
        },
        onDelete: 'CASCADE',
    },
    tempValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humValue: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    valueFecha: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW, 
        allowNull: false 
    }
}, {
    tableName: 'valores',
});

Lugar.hasMany(Valores, { foreignKey: 'lugar_id', onDelete: 'CASCADE' });
Valores.belongsTo(Lugar, { foreignKey: 'lugar_id', onDelete: 'CASCADE' });

module.exports = Valores;
