/* 
    /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitals,
    addHospitals,
    updateHosppitals,
    deleteHospitals
} = require('../controllers/hospital');

const router = Router();

router.get('/', getHospitals);
router.post(
    '/', [
        validarJWT,
        check('name', 'Hospital´s name is required').not().isEmpty(),
        validarCampos
    ],
    addHospitals
);

router.put(
    '/:id', [],
    updateHosppitals
);
router.delete('/:id', deleteHospitals);

module.exports = router;