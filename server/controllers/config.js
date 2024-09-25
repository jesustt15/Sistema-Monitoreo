const {response} = require('express');
const Config = require('../models/Config');


 const saveConfig = async (req , res = response) =>{
    
    const {email, password} = req.body;
    try {

         let emailUser =  await Config.findOne({email})

         if(email){
            return res.status(400).json({
               ok: false,
               msg: 'El email ya se encuentra agregado'
            })
         }

        const configUser = new Config(req.body);
        await configUser.save();

        res.status(201).json({
            email: configUser.email,
            password: configUser.password, 
            mensaje: 'DATOS CALIDAD'});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 };


 const getConfig = async (req, res = response) =>{
  


      const configUser = await Config.find()
                                        
    res.json(lugar);
 };



 module.exports = {
    saveConfig,
    getConfig
 }