const {response} = require('express');
const Valores = require('../models/Valores');
const Lugar = require('../models/Lugar');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jevicleoknock@gmail.com',
      pass: 'incl bfko rpwi xlsm'
    }
  });

 const saveValores = async (req , res = response) =>{
    
    const {lugar , tempValue, humValue} = req.body;
    try {

        const valores = new Valores(req.body);
        await valores.save();

        res.status(201).json({
            lugar: valores.lugar,
            tempValue: valores.tempValue, 
            humValue: valores.humValue,
            mensaje: 'dATOS CALIDAD'});

            const localidad = await Lugar.findById(lugar);

            const tempMax = localidad.tempMax;

            


            if( tempValue > tempMax  ) 

               { // Ajusta este valor según tus necesidades
                  const mailOptions = {
                    from: 'jevicleoknock@gmail.com',
                    to: 'jesustoussaint08@gmail.com',
                    subject: 'Alerta de Temperatura Alta',
                    text: `La temperatura ha alcanzado ${tempValue}°C.`
                  };
              
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log('Error al enviar el correo:', error);
                      res.status(500).send('Error al enviar el correo');
                    } else {
                      console.log('Correo enviado:', info.response);
                      res.status(200).send('Correo enviado');
                    }
                  });
                } else {
                   res.status(200).send('Temperatura normal');
                }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
 };


 const getValores = async (req, res = response) =>{
  


      const valores = await Valores.find().populate('lugar','name');

                                        
    res.json(tempMax);
 };



 module.exports = {
    saveValores,
    getValores
 }