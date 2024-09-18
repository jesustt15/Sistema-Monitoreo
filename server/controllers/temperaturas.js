const {response} = require('express');
const Temperatura = require('../models/Temperatura');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jevicleoknock@gmail.com',
      pass: process.env.GMAIL_PASS
    }
  });

 const saveTemperaturas = async (req , res = response) =>{
    
    const {id , tempValue} = req.body;
    try {

        const temperatura = new Temperatura(req.body);
        await temperatura.save();

        res.status(201).json({
            id: temperatura.id,
            tempValue: temperatura.tempValue, 
            mensaje: 'dATOS CALIDAD'});

            if( tempValue > 50) 
               { // Ajusta este valor según tus necesidades
                  const mailOptions = {
                    from: 'jevicleoknock@gmail.com',
                    to: 'dalucyfuentes@gmail.com',
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


 const getTemperaturas = async (req, res = response) =>{
    const temperaturas = await Temperatura.find()
                                        
    res.json(temperaturas);
 };



 module.exports = {
    saveTemperaturas,
    getTemperaturas
 }