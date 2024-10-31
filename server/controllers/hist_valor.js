const Hist_valor = require("../models/Hist_valor");
const Lugar = require("../models/Lugar");
const Valores = require("../models/Valores");

const getHistValues = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const { rows: histValues, count } = await Hist_valor.findAndCountAll({
            limit,
            offset,
            include: [{
                model: Valores,
                attributes: ['tempValue', 'humValue', 'valueFecha'],
                include: [{
                    model: Lugar,
                    attributes: ['name']
                }]
            }]
        });

        const totalPages = Math.ceil(count / limit);

        res.json({ data: histValues, totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en cargar la tabla Historico');
    }
};

module.exports = {
    getHistValues,
}
