const {Router} = require('express');
const { getUsuarios, crearUsuario, deleteUsuarios, editUsuario, getOneUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');



const router = Router();

router.get('/', getUsuarios);
router.post('/' ,  
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        
        validarCampos
    ]
    , crearUsuario);
router.delete('/:id' , deleteUsuarios);
router.put('/:id' ,editUsuario);
router.get('/:id', getOneUsuario);


module.exports = router;