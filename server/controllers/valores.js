const {response} = require('express');
const { Op } = require('sequelize');
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
                      try {

                        const { email, password, emailSend } = await getConfigCredentials();
                        const transporter = createTransporter(email, password);
                        await sendEmail(transporter, emailSend, 'Alerta de Temperatura', `La temperatura ha alcanzado ${tempValue}°C. en ${lugar.name}`);
                        return res.status(201).send('Coreo enviado');
                      } catch (error) {
                        console.log(error);
                        
                      }
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
              attributes: ['name']
            }]
        });
        res.json(valores);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error en cargar la tabla Historico');
      }
 };

 const getValoresByPagination = async (req, res = response) => {
    const { page = 1, limit = 5, search = 'Guayana' } = req.query;  // 'Guayana' como valor predeterminado
    console.log('API Request - Page:', page, 'Search:', search); // Verificar parámetros recibidos
    try {
        const { count, rows } = await Valores.findAndCountAll({
            where: {
                '$lugare.name$': {
                    [Op.like]: `%${search}%`
                }
            },
            include: [{ model: Lugar, attributes: ['name'] }],
            order: [['valueFecha', 'DESC']],  // Ordenar por fecha de forma descendente
            limit: parseInt(limit),
            offset: (page - 1) * limit
        });
        console.log('API Response:', rows);  // Verificar respuesta
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            items: rows
        });
    } catch (error) {
        console.error('Error loading values:', error);
        res.status(500).send('Error en cargar los valores');
    }
};





 module.exports = {
    saveValores,
    getValores,
    getValoresByPagination
 }