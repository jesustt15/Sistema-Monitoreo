
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
        onDelete: 'CASCADE', // Asegura la eliminación en cascada
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
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
}, {
    tableName: 'valores', // Nombre de la tabla en la base de datos
});

// Relaciones
Lugar.hasMany(Valores, { foreignKey: 'lugar_id', onDelete: 'CASCADE', hooks: true });
Valores.belongsTo(Lugar, { foreignKey: 'lugar_id', onDelete: 'CASCADE', hooks: true });

module.exports = Valores;

