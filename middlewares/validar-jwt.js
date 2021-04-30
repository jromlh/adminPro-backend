const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    /* Leemos el token */
    const token = req.header('token');

    /* Validamos que exista un token */
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        /* Grabamos en la request el id */
        req.uid = uid;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        });

    }

}


module.exports = {
    validarJWT
}