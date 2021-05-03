const { response } = require('express');
const User = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



const busqueda = async(req, res = response) => {

    const palabra = req.params.palabra;
    /* 
        Creamos uan expresión regular para la busqueda no sea key sensitive
        i = insensible
    */
    const expre_reg = new RegExp(palabra, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        User.find({ name: expre_reg }),

        Medico.find({ name: expre_reg }),

        Hospital.find({ name: expre_reg }),
    ]);

    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });
}



const busquedaPorColeccion = async(req, res = response) => {

    const { coleccion, palabra } = req.params;
    /* 
        Creamos uan expresión regular para la busqueda no sea key sensitive
        i = insensible
    */
    const expre_reg = new RegExp(palabra, 'i');

    let resultado = [];

    switch (coleccion) {
        case 'usuarios':
            resultado = await User.find({ name: expre_reg });
            break;

        case 'medicos':
            resultado = await Medico
                .find({ name: expre_reg })
                .populate('hospital', 'name')
                .populate('usuario', 'name');
            break;

        case 'hospitales':
            resultado = await Hospital
                .find({ name: expre_reg })
                .populate('usuario', 'name');
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Unexpected error...'
            });
    }

    res.status(200).json({
        ok: true,
        resultado
    });
}


module.exports = {
    busqueda,
    busquedaPorColeccion
}