const {response} = require('express');
const Lugar = require('../models/Lugar');
const pool = require('../config/database');


const saveLugar = async (req, res = response) => {
   const { name, tempMin, tempMax, humMax, humMin } = req.body;
   try {
       // Convertir el nombre de la localidad a minúsculas
       const normalizedName = name.toLowerCase();

       let localidad = await Lugar.findOne({ where: { name: normalizedName } });

       if (localidad) {
           return res.status(400).json({
               ok: false,
               msg: 'La localidad ya se encuentra agregada'
           });
       }

       // Crear la localidad con el nombre normalizado
       const lugar = await Lugar.create({ ...req.body, name: normalizedName });

       res.status(201).json({
           name: lugar.name,
           tempMin: lugar.tempMin,
           tempMax: lugar.tempMax,
           humMin: lugar.humMin,
           humMax: lugar.humMax,
           mensaje: 'DATOS CALIDAD'
       });

   } catch (error) {
       if (error.name === 'SequelizeValidationError') {
           res.status(400).json({ error: error.message });
       } else {
           console.log(error);
           res.status(500).json({ error });
       }
   }
};



 const getLugar = async (req, res = response) =>{
  
      try {
         
         const lugares = await Lugar.findAll();
         return res.json(lugares);

      } catch (error) {
          res.sendStatus(500);
         
      }

 };

 const getOneLugar = async (req, res = response ) =>{

   try {
      const lugar = await Lugar.findOne({where: {lugar_id: req.params.id}});
      if (!lugar) return res.status(404).json({ message: "lugar not found" });
      return res.json(lugar);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
 }

 const updateLugar = async( req, res = response) =>{

   try {
      const lugar = await Lugar.update(req.body ,{
         where: {lugar_id: req.params.id}
      });
      if(lugar){
         return res.status(201).json({
            ok: false,
            name: lugar.name,
            msg: 'La localidad ha sido actualizada'
         })
      }
   } catch (error) {
      if (error.name === 'SequelizeValidationError') {
         res.status(400).json({ error: error.message });
      }else {
         console.log(error);
         res.status(500).json({error});
      }
   }

 };

 const deleteLugar = async( req, res = response) =>{

   try {
      const lugar = await Lugar.destroy({where: {lugar_id: req.params.id}});
      if(lugar){
         return res.status(204).json({
            ok: false,
            name: lugar.name,
            msg: 'La localidad ha sido eliminada'
         })
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({error});
   }

 };


 module.exports = {
    saveLugar,
    getLugar,
    updateLugar,
    deleteLugar,
    getOneLugar,
 }