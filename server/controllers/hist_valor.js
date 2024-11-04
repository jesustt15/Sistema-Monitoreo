const Hist_valor = require("../models/Hist_valor");
const Lugar = require("../models/Lugar");
const Valores = require("../models/Valores");
const { Op } = require('sequelize');

const getHistValues = async (req, res) => {
    const { page = 1, limit = 10, search = 'Guayana' } = req.query;
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;

    try {
        const { rows: histValues, count } = await Hist_valor.findAndCountAll({
            where: {
                '$valore.lugare.name$': {
                    [Op.like]: `%${search}%`
                }
            },
            include: [{
                model: Valores,
                attributes: ['tempValue', 'humValue', 'valueFecha'],
                include: [{
                    model: Lugar,
                    attributes: ['name'],
                }],
            }],
            limit: limitInt,
            offset: (pageInt - 1) * limitInt,
            order: [['valore', 'valueFecha', 'ASC']],
        });

        res.json({ 
            totalItems: count,
            totalPages: Math.ceil(count / limitInt),
            currentPage: pageInt,
            items: histValues,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en cargar la tabla Historico');
    }
};

module.exports = {
    getHistValues,
}
