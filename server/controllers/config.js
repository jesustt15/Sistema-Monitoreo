const {response} = require('express');
const Config = require('../models/Config');


const updateConfig = async( req, res = response) =>{

   try {
      const configCredentials = await Config.findByIdAndUpdate(req.params.id , req.body ,{
         new: true,
      });
      if(configCredentials.email){
         return res.status(400).json({
            ok: false,
            name: configCredentials.email,
            msg: 'El correo a sido actualizado'
         })
      }
   } catch (error) {
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