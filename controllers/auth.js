const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');


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

const googleSignIn = async(req, res = response) => {

    const { token } = req.body;

    try {

        const { name, email, picture } = await googleVerify(token);

        /* verificar si existe un susuario ya en la bd con ese email  */
        const usuariodb = await User.findOne({ email });
        let usuario;

        if (!usuariodb) {
            usuario = new User({
                name,
                email,
                password: '123',
                img: picture,
                google: true
            });
        } else {
            usuario = usuariodb;
            usuario.google = true;
        }


        /* console.log(usuario); */
        await usuario.save();

        const backend_token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            backend_token
        });

    } catch (error) {

        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Invalid token '
        });

    }


}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    /* generamos nuevo token */
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}