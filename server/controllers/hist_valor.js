const Hist_valor = require("../models/Hist_valor");



const getHistValues = async (req, res = response) =>{
  

    const populate = ([  
        {
           path: 'value_id', populate: { path: 'lugar' }, select: 'name tempValue humValue valueFecha'
        }
             ]);
    const histValues = await Hist_valor.find().populate(populate);
                                      
    res.json(histValues);
};


module.exports = {

    getHistValues,

 }