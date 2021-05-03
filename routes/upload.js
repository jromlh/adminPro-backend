/* 
    /api/uploads
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { uploadFile, getImage } = require('../controllers/uploads');

/* para hacer uploads de archivos */
const fileUpload = require('express-fileupload');

const router = Router();

router.use(fileUpload());

router.put('/:coleccion/:id', validarJWT, uploadFile);
router.get('/:coleccion/:img', getImage);


module.exports = router;