const { response } = require("express");
const jwt = require("jsonwebtoken");

 

 const validarJWT = (req, res = response, next) =>{

    const {token} = req.cookies;

    if (!token){
        res.status(401).json({
            ok: false ,
            msg: 'no hay nada en la peticion'
        });

    }
    try {

        const {uid, name} = jwt.verify(
            token,
           'es un secreto' 

        )
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        });
        
    }

    next();


 }

 module.exports = {
    validarJWT
 }