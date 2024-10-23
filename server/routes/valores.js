const {Router} = require('express');
const { saveValores, getValores } = require('../controllers/valores');
// const { verifyToken } = require('../middlewares/validar-JWT');



const router = Router();

// router.get('/', verifyToken, getValores);
router.get('/', getValores);
router.post('/', saveValores);



module.exports = router;