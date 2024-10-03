const {Router} = require('express');
const { getLugar, saveLugar, deleteLugar, updateLugar, getOneLugar} = require('../controllers/lugar');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { auth } = require('../middlewares/validar-JWT');


const router = Router();

router.get('/',getLugar);
router.post('/', saveLugar);
router.delete('/:id', deleteLugar);
router.put('/:id', updateLugar);
router.get('/:id', getOneLugar);


module.exports = router;