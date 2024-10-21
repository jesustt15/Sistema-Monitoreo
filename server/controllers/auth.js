const {response} = require('express');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {createAccessToken} = require('../helpers/jwt');
const jwt = require('jsonwebtoken');

const crearUsuario = async(req,res = response) => {
    
    const {name , email, password} = req.body;

    
    try {

        let usuario =  await Usuario.findOne({where: { email}})

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya se encuentra en uso'
            })
        }
        

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        hashedPassword = bcrypt.hashSync(password, salt);
        usuario = await Usuario.create({name , email , password: hashedPassword});
        console.log(usuario.password , usuario.name);



        //Generar JWT
        const token = await await createAccessToken({
            user_id: usuario.user_id,
            name: usuario.name,
          });       
        return res.status(201).json({
            ok: true,
            uid: usuario.user_id,
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
        const usuario =  await Usuario.findOne({where: { email }});

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
            user_id: usuario.user_id,
            name: usuario.name,
          })
      
          res.json({
            token,
            name: usuario.name,
            email: usuario.email
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Esa es tu vida'
        })
    }

}

const logout = async (req, res = response) => {


    res.send('logout exitoso');
}



module.exports = {
    crearUsuario,
    loginUsuario,
    logout

    
}