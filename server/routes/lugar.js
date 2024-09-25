const {Router} = require('express');
const { getLugar, saveLugar, deleteLugar, updateLugar} = require('../controllers/lugar');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');


const router = Router();

router.get('/', getLugar);
router.post('/', saveLugar);
router.delete('/:id', deleteLugar);
router.put('/:id', updateLugar);



module.exports = router;