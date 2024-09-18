const {Router} = require('express');
const { getTemperaturas, saveTemperaturas } = require('../controllers/temperaturas');



const router = Router();

router.get('/', getTemperaturas);

router.post('/', saveTemperaturas);



module.exports = router;