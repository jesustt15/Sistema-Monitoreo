const {response} = require('express');
const Config = require('../models/Config');


const updateConfig = async( req, res = response) =>{

   const { email, password } = req.body;
   try {
      const configCredentials = await Config.findById('66f6b76792843d8345d4133f');
      if(configCredentials){
         configCredentials.email = email;
         configCredentials.password = password; // Asegúrate de hashear la contraseña antes de guardarla
         await configCredentials.save();
         res.status(200).send('Actualización exitosa');
         }
      }
      catch (error) {
      console.log(error);
      res.status(500).json({error});
   }

 };


 const getConfig = async (req, res = response) =>{
  


      const configUser = await Config.find()
                                        
    res.json(configUser);
 };



 module.exports = {
    updateConfig,
    getConfig
 }