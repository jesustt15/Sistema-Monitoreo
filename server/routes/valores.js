const {Router} = require('express');
const { saveValores, getValores, getValoresByPagination } = require('../controllers/valores');
// const { verifyToken } = require('../middlewares/validar-JWT');



const router = Router();

// router.get('/', verifyToken, getValores);
router.get('/all', getValores);
router.get('/', getValoresByPagination);
router.post('/', saveValores);



module.exports = router;