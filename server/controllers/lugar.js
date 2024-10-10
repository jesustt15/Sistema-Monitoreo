const {response} = require('express');
const Lugar = require('../models/Lugar');
const pool = require('../config/database');


 const saveLugar = async (req , res = response) =>{
    
    const {name, tempMin,tempMax, humMax, humMin} = req.body;
    try {

         let localidad =  await Lugar.findOne({name})

         if(localidad){
            return res.status(400).json({
               ok: false,
               msg: 'La localidad ya se encuentra agregada'
            })
         }

        const lugar = new Lugar(req.body);
        await lugar.save();

        res.status(201).json({
            name: lugar.name,
            tempMin: lugar.tempMin, 
            tempMax: lugar.tempMax, 
            humMin: lugar.humMin,
            humMax: lugar.humMax,
            mensaje: 'DATOS CALIDAD'});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 };


 const getLugar = async (req, res = response) =>{
  


   const lugares = await pool.query('SELECT * FROM lugares');
   res.json(lugares.rows);

 };

 const getOneLugar = async (req, res = response ) =>{

   try {
      const lugar = await Lugar.findById(req.params.id);
      if (!lugar) return res.status(404).json({ message: "lugar not found" });
      return res.json(lugar);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
 }

 const updateLugar = async( req, res = response) =>{

   try {
      const lugar = await Lugar.findByIdAndUpdate(req.params.id , req.body ,{
         new: true,
      });
      if(lugar){
         return res.status(201).json({
            ok: false,
            name: lugar.name,
            msg: 'La localidad ha sido actualizada'
         })
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({error});
   }

 };

 const deleteLugar = async( req, res = response) =>{

   try {
      const lugar = await Lugar.findByIdAndDelete(req.params.id);
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