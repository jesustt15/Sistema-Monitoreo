const {response} = require('express');
const bcrypt = require('bcryptjs');
const Config = require('../models/Config');


const updateConfig = async( req, res = response) =>{

   const { email, password, emailSend } = req.body;
   try {
      const configCredentials = await Config.findOne();

      if(configCredentials){
         configCredentials.email = email;
         configCredentials.emailSend = emailSend;
         //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        hashedPassword = bcrypt.hashSync(password, salt);
         configCredentials.password = hashedPassword;
         

        
        const newConfig = await Config.update({email, password, emailSend} ,{
         where: {config_id: 23}
      });
         res.status(200).send(newConfig);
         }
      }
      catch (error) {
      console.log(error);
      res.status(500).json({error});
   }

 };


 const getConfig = async (req, res = response) =>{

   try {
      const config = await Config.findOne();
      res.json(config);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
    }
 };



 module.exports = {
    updateConfig,
    getConfig
 }