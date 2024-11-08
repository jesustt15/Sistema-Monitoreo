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
    const { lugar_id, tempValue, humValue } = req.body;
    try {
        const valores = await Valores.create(req.body);
        const lugar = await Lugar.findByPk(lugar_id);
        if (tempValue > lugar.tempMax || tempValue < lugar.tempMin || humValue > lugar.humMax || humValue < lugar.humMin) {
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
                await sendEmail(transporter, emailSend, 'Alerta de Temperatura', `La temperatura ha alcanzado ${tempValue}°C. en ${lugar.name}`);
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
    const { page = 1, limit = 5, search = 'Guayana' } = req.query;
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
            order: [['valueFecha', 'ASC']]
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
