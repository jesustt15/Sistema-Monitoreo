const {Router} = require('express');
const { getConfig, saveConfig} = require('../controllers/config');



const router = Router();

router.get('/', getConfig);

router.post('/', saveConfig);



module.exports = router;