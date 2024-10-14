const {response} = require('express');
const Valores = require('../models/Valores');
const Lugar = require('../models/Lugar');
const Hist_valor = require('../models/Hist_valor');
const nodemailer = require('nodemailer');
const email = require('./config');
const getConfigCredentials = require('../helpers/getConfigCredentials');
const { createTransporter, sendEmail } = require('../helpers/mailer');



 const saveValores = async (req , res = response) =>{
    
    const {lugar , tempValue, humValue} = req.body;
    try {

        const valores = await Valores.create(req.body);

        
            const { tempMax, humMax, tempMin, humMin, name } = await Lugar.findByPk(lugar);

          

            if( tempValue > tempMax || tempValue < tempMin || humValue > humMax || humValue < humMin ) { 
              
              //logica de guardar en historico
              try {
                      const histValues = await Hist_valor.create({value_id: valores._id});
                    
                    } catch (error) {
                      
                      console.log(error)
                        return res.status(500).json({
                          ok: false,
                          msg: 'Error en guardar en Tabla histórico'
                      })
                    }
                      try {

                        const { email, password } = await getConfigCredentials();
                        const transporter = createTransporter(email, password);
                        await sendEmail(transporter, 'jesustoussaint08@gmail.com', 'Alerta de Temperatura', `La temperatura ha alcanzado ${tempValue}°C. en ${name}`);
                        return res.status(201).send('Coreo enviado');
                      } catch (error) {
                        console.log(error);
                        
                      }
                  } else {
                    res.status(200).send('datos guardados y temperatura normal');
                  } 
                  
        
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