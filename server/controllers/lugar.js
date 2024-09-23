const {response} = require('express');
const Lugar = require('../models/Lugar');


 const saveLugar = async (req , res = response) =>{
    
    const {lugar, tempMin,tempMax, humMax, humMin} = req.body;
    try {

        const lugar = new Lugar(req.body);
        await lugar.save();

        res.status(201).json({
            lugar: lugar.lugar,
            tempMin: lugar.tempMin, 
            tempMax: lugar.tempMax, 
            humMin: lugar.humMin,
            humMax: lugar.humMax,
            mensaje: 'dATOS CALIDAD'});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 };


 const getLugar = async (req, res = response) =>{
  


      const lugar = await Lugar.find()
                                        
    res.json(lugar);
 };



 module.exports = {
    saveLugar,
    getLugar
 }