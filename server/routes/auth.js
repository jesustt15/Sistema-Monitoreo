// Rutas del Usuario
// host + api/auth

const {Router} = require('express');
const { crearUsuario, loginUsuario,  verifyToken } = require('../controllers/auth');
const router = Router();
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-JWT');


router.post('/new',
//middlewares de validacion
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        
        validarCampos


    ] ,crearUsuario);

router.post('/',loginUsuario );

router.get("/verify", verifyToken);

module.exports = router