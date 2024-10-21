const { response } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {SECRET_TOKEN} = process.env;

const verifyToken = (req, res = response, next) => {
  const authHeader = req.header('Authorization');
  // Extrae el token independientemente del formato
  const token = authHeader && (authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader);
  console.log(token);
  
  if (!token) {
    console.error('No token provided');
    return res.status(401).send('Access Denied');
}

jwt.verify(token, SECRET_TOKEN, (err, user) => {
    if (err) {
        console.error('Invalid token', err);
        return res.status(403).send('Invalid Token');
    }
    req.user = user;
    next();
});
};

module.exports = {verifyToken};