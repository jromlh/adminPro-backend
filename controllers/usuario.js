const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const User = require('../models/usuario');

const getUsuarios = async(req, res) => {

    const users = await User.find({}, 'name email role');

    res.status(200).json({
        ok: 'true',
        users,
        uid: req.uid
    });
}

const addUsuarios = async(req, res = response) => {
    const { password, email } = req.body;

    try {

        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already registred'
            });
        }

        const user = new User(req.body);

        /* antes de guardar al susuariod ebemos de encriptar su contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generarJWT(user.id);


        res.status(200).json({
            ok: 'true',
            msg: 'New user created',
            user,
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

const updateUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        //validar que el usuario si exista
        const usuarioDB = await User.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        /*  validación de los campos
            el password ni google se va a acualizar desde aquí 
            validación de que si se va a cambiar el email sea por uno que no tengamos ya guardado en la base de datos
        */
        const campos = req.body;

        if (usuarioDB.email === req.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await User.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'This email is already registred'
                });
            }
        }

        delete campos.password;
        delete campos.google;

        /* Actualización de los datos | { new: true } es para que muestre el registro actualizado */
        const updatedUser = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error...'
        });

    }

}

const deleteUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        //validar que el usuario si exista
        const usuarioDB = await User.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        //eliminación del usuario
        const deletedUser = await User.findByIdAndRemove(uid);

        res.status(200).json({
            ok: true,
            user: deletedUser
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
    getUsuarios,
    addUsuarios,
    updateUsuario,
    deleteUsuario
}