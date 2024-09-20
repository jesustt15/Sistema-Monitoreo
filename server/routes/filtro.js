// routes/datos.js
const express = require('express');
const router = express.Router();
const { filtrarDatos } = require('../helpers/filtrarDatos');

router.get('/filtrados', async (req, res) => {
  const filtro = req.query.filtro;
  try {
    const datos = await filtrarDatos(filtro);
    res.json(datos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
