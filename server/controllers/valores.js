const {response} = require('express');
const Valores = require('../models/Valores');
const Lugar = require('../models/Lugar');
const Hist_valor = require('../models/Hist_valor');
const nodemailer = require('nodemailer');
const email = require('./config');
const getConfigCredentials = require('../helpers/getConfigCredentials');
const { createTransporter, sendEmail } = require('../helpers/mailer');



 const saveValores = async (req , res = response) =>{
    
    const {lugar_id , tempValue, humValue} = req.body;
    try {

        const valores = await Valores.create(req.body);

        
            const lugar = await Lugar.findByPk(lugar_id);

          

            if( tempValue > lugar.tempMax || tempValue < lugar.tempMin || humValue > lugar.humMax || humValue < lugar.humMin ) { 
              
              //logica de guardar en historico
              try {
                      const histValues = await Hist_valor.create({value_id: valores.valor_id});
                    
                    } catch (error) {
                      
                      console.log(error)
                        return res.status(500).json({
                          ok: false,
                          msg: 'Error en guardar en Tabla histórico'
                      })
                    }
                      // try {

                      //   const { email, password } = await getConfigCredentials();
                      //   const transporter = createTransporter(email, password);
                      //   await sendEmail(transporter, 'jesustoussaint08@gmail.com', 'Alerta de Temperatura', `La temperatura ha alcanzado ${tempValue}°C. en ${name}`);
                      //   return res.status(201).send('Coreo enviado');
                      // } catch (error) {
                      //   console.log(error);
                        
                      // }
                  } else {
                    return res.status(200).send('datos guardados y temperatura normal');
                  } 

                  return res.status(200).send('datos bellacos');
                  
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({error});
    }
 };


 const getValores = async (req, res = response) =>{
  

      try {
        const valores = await Valores.findAll({
          include: [{
            model: Lugar,
            attributes: ['name'] // Asegúrate de que el atributo 'nombre' existe en Lugar
          }]
        });
        res.json(valores);
        
      } catch (error) {

        console.error(error);
        res.status(500).send('Error En cargar los valores');
        
      }
 };



 module.exports = {
    saveValores,
    getValores
 }