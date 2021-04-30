const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const User = require('../models/usuario');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        /* Se valida el email */
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Credentials not valid'
            });
        }

        /* Validar el password */
        const pass = bcrypt.compareSync(password, userDB.password);
        if (!pass) {
            return res.status(404).json({
                ok: false,
                msg: 'Credentials not valid (pass)'
            });
        }

        /* 
            En este punto ya feu verificado el email y la contraseña
            Generar el tocken 
        */
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error...'
        });
    }
}

module.exports = {
    login
}