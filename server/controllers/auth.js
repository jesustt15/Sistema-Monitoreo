const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {createAccessToken} = require('../helpers/jwt');
const jwt = require('jsonwebtoken');

const crearUsuario = async(req,res = response) => {
    
    const { email, password} = req.body;

    
    try {

        let usuario =  await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya se encuentra en uso'
            })
        }
        
        usuario = new Usuario(req.body);
        console.log(usuario.password , usuario.name);
        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json(  token );        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        }    
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Esa es tu vida'
        })
        
    }
}

const loginUsuario = async(req,res = response) => {
   

    try {
        const {email, password} = req.body;
        const usuario =  await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Email / Password Incorrecto'
            })
        }
        //comparar password
        const validPassword =  await bcrypt.compare(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Email / Password Incorrecto'
            })
        }
         
        //Generar JWT 
        const token = await createAccessToken({
            id: usuario._id,
            name: usuario.name,
          });
      
        //   res.cookie("token", token, {
        //     httpOnly: true,
        //     sameSite: 'Strict' 
        //   });
      
          res.json({
            token
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Esa es tu vida'
        })
    }

}

    // const verifyToken = async (req, res) => {
    //     const  token  = req.cookies.token;
    //     if (!token) return res.status(401).json({ message: 'No autorizado' });
    
    //     jwt.verify(token, 'secret-key', async (error, decoded) => {
    //     if (error) return res.sendStatus(401);
    
    
    //     return res.json({
    //         message: 'ACCESO CONCEDIDO'
    //     });
    //     });
    // };

module.exports = {
    crearUsuario,
    loginUsuario,

    
}