/* 
    /api/busqueda/
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    busqueda,
    busquedaPorColeccion
} = require('../controllers/busqueda');

const router = Router();

router.get('/:palabra', [validarJWT], busqueda);
router.get('/:coleccion/:palabra', [validarJWT], busquedaPorColeccion);


module.exports = router;