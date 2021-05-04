/* 
    /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post(
    '/', [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').notEmpty(),
        validarCampos
    ],
    login
);
router.post(
    '/google', [
        check('token', 'Google´s token is required').notEmpty(),
        validarCampos
    ],
    googleSignIn
);




module.exports = router;