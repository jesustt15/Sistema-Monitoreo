const {Router} = require('express');
const { saveValores, getValores } = require('../controllers/valores');



const router = Router();

router.get('/', getValores);

router.post('/', saveValores);



module.exports = router;