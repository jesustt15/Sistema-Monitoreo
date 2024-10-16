const { response } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {SECRET_TOKEN} = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send('Token requerido');
  }

  jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send('Token inválido');
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;