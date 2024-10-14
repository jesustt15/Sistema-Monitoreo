const Hist_valor = require("../models/Hist_valor");
const Lugar = require("../models/Lugar");
const Valores = require("../models/Valores");



const getHistValues = async (req, res = response) =>{
  

    // const populate = ([  
    //     {
    //        path: 'value_id', populate: { path: 'lugar' }, select: 'name tempValue humValue valueFecha'
    //     }
    //          ]);
    // const histValues = await Hist_valor.find().populate(populate);
                                      
    // res.json(histValues);
    try {
        const histValues = await Hist_valor.findAll({
          include: [{
            model: Valores,
            attributes: ['tempValue', 'humValue', 'valueFecha'],
            include: [{
              model: Lugar,
              attributes: ['name']
            }]
          }]
        });
        res.json(histValues);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error en cargar la tabla Historico');
      }
};


module.exports = {

    getHistValues,

 }