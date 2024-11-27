const Hist_valor = require("../models/Hist_valor");
const Lugar = require("../models/Lugar");
const Valores = require("../models/Valores");
const { Op, Sequelize } = require('sequelize');

const getHistValues = async (req, res) => {
    const { page = 1, limit = 10, search = '', filterType, filterValue } = req.query;
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;

    console.log('Request Query:', req.query); // Log para ver los parámetros de la solicitud

    try {
        // Base query with search filter
        const query = {
            include: [{
                model: Valores,
                attributes: ['tempValue', 'humValue', 'valueFecha'],
                required: true,
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
                order: [['valueFecha', 'DESC']],
                where: {} // Añadir un lugar para los filtros de mes/año
            }],
            limit: limitInt,
            offset: (pageInt - 1) * limitInt,
           
        };

        console.log('Query before filters:', JSON.stringify(query, null, 2)); // Log para ver la consulta antes de aplicar filtros

        // Add filter for month or year if present
        if (filterType && filterValue) {
            console.log('Applying filter:', filterType, filterValue); // Log para ver el filtro aplicado
            if (filterType === 'mes') {
                query.include[0].where[Op.and] = [
                    Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal(`MONTH FROM "valueFecha"`)), filterValue)
                ];
            } else if (filterType === 'año') {
                query.include[0].where[Op.and] = [
                    Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal(`YEAR FROM "valueFecha"`)), filterValue)
                ];
            }
        }

        console.log('Query after filters:', JSON.stringify(query, null, 2)); // Log para ver la consulta después de aplicar filtros

        const { rows: histValues, count } = await Hist_valor.findAndCountAll(query);

        res.json({ 
            totalItems: count,
            totalPages: Math.ceil(count / limitInt),
            currentPage: pageInt,
            items: histValues,
        });
    } catch (err) {
        console.error('Error in getHistValues:', err); // Log para capturar errores
        res.status(500).send('Error en cargar la tabla Historico');
    }
};

module.exports = {
    getHistValues,
};


