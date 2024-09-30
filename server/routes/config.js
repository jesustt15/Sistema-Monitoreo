const {Router} = require('express');
const { getConfig, saveConfig, updateConfig} = require('../controllers/config');
const { validarCampos } = require('../middlewares/validar-campo');
const { check } = require('express-validator');



const router = Router();

router.get('/', getConfig);

router.put('/',[
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
] ,updateConfig);



module.exports = router;