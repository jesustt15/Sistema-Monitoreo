const {Router} = require('express');
const { getHistValues } = require('../controllers/hist_valor');



const router = Router();

router.get('/', getHistValues);


module.exports = router;