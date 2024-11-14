const { response } = require('express');
const { Op } = require('sequelize');
const Valores = require('../models/Valores');
const Lugar = require('../models/Lugar');
const Hist_valor = require('../models/Hist_valor');
const nodemailer = require('nodemailer');
const email = require('./config');
const getConfigCredentials = require('../helpers/getConfigCredentials');
const { createTransporter, sendEmail } = require('../helpers/mailer');

const saveValores = async (req, res = response) => {
    console.log(req.body);
    const { lugar_id, tempValue, humValue } = req.body;
    try {
        const valores = await Valores.create({ lugar_id, tempValue, humValue });
        const lugar = await Lugar.findByPk(lugar_id);
        
        // Obtener los últimos 5 valores registrados
        const ultimosValores = await Valores.findAll({
            limit: 5,
            order: [['valueFecha', 'DESC']],
            include: [{
                model: Lugar,
                attributes: ['name'],
                where: {
                     lugar_id
                },
                required: true
            }]
        });

        const valoresTexto = ultimosValores.map(valor => {
            return `Fecha: ${valor.valueFecha}, Temperatura: ${valor.tempValue}°C, Humedad: ${valor.humValue}%`;
        }).join('\n');

        // Verificar si los valores están fuera de rango
        if (tempValue > lugar.tempMax || tempValue < lugar.tempMin || humValue > lugar.humMax || humValue < lugar.humMin) {
            let alertaTipo = "";
            if (tempValue > lugar.tempMax || tempValue < lugar.tempMin) {
                alertaTipo = `La temperatura ha alcanzado ${tempValue}°C.`;
            } else if (humValue > lugar.humMax || humValue < lugar.humMin) {
                alertaTipo = `La humedad ha alcanzado ${humValue}%.`;
            }
            
            // Logica de guardar en historico
            try {
                await Hist_valor.create({ value_id: valores.valor_id });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ ok: false, msg: 'Error en guardar en Tabla histórico' });
            }
            try {
                const { email, password, emailSend } = await getConfigCredentials();
                const transporter = createTransporter(email, password);
                
                const mensajeAlerta = `${alertaTipo} en ${lugar.name}\n\nÚltimos 5 valores registrados:\n${valoresTexto}`;
                await sendEmail(transporter, emailSend, 'Alerta de Sensor', mensajeAlerta);

                return res.status(201).send('Correo enviado');
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(200).send('Datos guardados y temperatura normal');
        }
        return res.status(200).send('Datos bellacos');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
};

const getValores = async (req, res = response) => {
    const { search = 'Guayana' } = req.query;
    try {
        const valores = await Valores.findAll({
            include: [{
                model: Lugar,
                attributes: ['name'],
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                required: true
            }],
            order: [['valueFecha', 'ASC']]
        });
        res.json(valores);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en cargar las gráficas');
    }
};

const getValoresByPagination = async (req, res = response) => {
    const { page = 1, limit = 10, search = 'Guayana' } = req.query;
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;
    try {
        const { count, rows } = await Valores.findAndCountAll({
            include: [{
                model: Lugar,
                attributes: ['name'],
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                required: true
            }],
            limit: limitInt,
            offset: (pageInt - 1) * limitInt,
            order: [['valueFecha', 'DESC']]
        });
        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limitInt),
            currentPage: pageInt,
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
};
