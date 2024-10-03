const {Router} = require('express');
const { getLugar, saveLugar, deleteLugar, updateLugar, getOneLugar} = require('../controllers/lugar');
const { validarCampos } = require('../middlewares/validar-campo');
const verifyToken = require('../middlewares/validar-JWT');


const router = Router();

router.get('/', getLugar);
router.post('/', verifyToken ,saveLugar);
router.delete('/:id', verifyToken , deleteLugar);
router.put('/:id', verifyToken ,updateLugar);
router.get('/:id', getOneLugar);


module.exports = router;