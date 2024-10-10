const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sensordb', 'postgres', 'Admin2024', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false // evita que se añadan columnas de timestamp automáticamente
  }
});

module.exports = sequelize;