const {Router} = require('express');
const { getLugar, saveLugar} = require('../controllers/lugar');



const router = Router();

router.get('/', getLugar);

router.post('/', saveLugar);



module.exports = router;