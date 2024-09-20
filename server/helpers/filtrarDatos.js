// services/datosService.js
const Valores = require('../models/Valores');

const filtrarDatos = async (filtro) => {
  let query = {};
  if (filtro === 'lugar') {
    query = { lugar: 'Guayana' }; // Filtra por id
  } else if (filtro === 'fecha') {
    query = { fecha: '2024-09-20' }; // Filtra por fecha
  }
  return await Valores.find(query);
};

module.exports = { filtrarDatos };
