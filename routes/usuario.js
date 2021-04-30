/* 
    /api/usuarios/
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, addUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
    '/', [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validarCampos
    ],
    addUsuarios
);

router.put(
    '/:id', [
        validarJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validarCampos
    ],
    updateUsuario
);
router.delete('/:id', validarJWT, deleteUsuario);

module.exports = router;