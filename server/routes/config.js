const {Router} = require('express');
const { getConfig, saveConfig, updateConfig} = require('../controllers/config');
const { validarCampos } = require('../middlewares/validar-campo');
const { check } = require('express-validator');



const router = Router();

router.get('/', getConfig);

router.put('/:id',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe se de minimo 6 carcateres').isLength({min: 6}),
    validarCampos
] ,updateConfig);



module.exports = router;