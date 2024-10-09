const {Router} = require('express');
const { getLugar, saveLugar, deleteLugar, updateLugar, getOneLugar} = require('../controllers/lugar');



const router = Router();

router.get('/', getLugar);
router.post('/' ,saveLugar);
router.delete('/:id' , deleteLugar);
router.put('/:id' ,updateLugar);
router.get('/:id', getOneLugar);


module.exports = router;