const Hist_valor = require("../models/Hist_valor");



const getHistValues = async (req, res = response) =>{
  


    const histValues = await Hist_valor.find().populate('value_id');
                                      
    res.json(histValues);
};


module.exports = {

    getHistValues,

 }