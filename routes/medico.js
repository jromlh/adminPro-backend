/* 
    /api/medico
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDoctor,
    addDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/medico');

const router = Router();

router.get('/', getDoctor);
router.post(
    '/', [
        validarJWT,
        check('name', 'Doctor´s name is required').notEmpty(),
        check('hospital', 'Hospital´s id is required and valid').isMongoId(),
        validarCampos
    ],
    addDoctor
);

router.put(
    '/:id', [
        validarJWT,
        check('name', 'Doctor´s name is required').notEmpty(),
        check('hospital', 'Hospital´s id is required and valid').isMongoId(),
        validarCampos
    ],
    updateDoctor
);
router.delete('/:id', validarJWT, deleteDoctor);

module.exports = router;