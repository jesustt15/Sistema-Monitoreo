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
      
          res.cookie("token", token, {
            secure: true,
            sameSite: "none",
          });
      
          res.json({
            id: usuario._id,
            name: usuario.name,
            email: usuario.email,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Esa es tu vida'
        })
    }

}

    const verifyToken = async (req, res) => {
        const { token } = req.cookies;
        if (!token) return res.send(false);
    
        jwt.verify(token, 'secret-key', async (error, user) => {
        if (error) return res.sendStatus(401);
    
        const userFound = await Usuario.findById(user.id);
        if (!userFound) return res.sendStatus(401);
    
        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        });
        });
    };

module.exports = {
    crearUsuario,
    loginUsuario,
    verifyToken,
    
}