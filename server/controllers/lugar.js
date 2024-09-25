const {response} = require('express');
const Lugar = require('../models/Lugar');


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
  


      const lugar = await Lugar.find()
                                        
    res.json(lugar);
 };

 const updateLugar async( req, res = response) =>{

 };

 const deleteLugar async( req, res = response) =>{

 };


 module.exports = {
    saveLugar,
    getLugar,
    updateLugar,
    deleteLugar
 }