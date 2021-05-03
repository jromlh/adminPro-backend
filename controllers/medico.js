const { response } = require('express');
const Medico = require('../models/medico');

const getDoctor = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'name')
        .populate('hospital', 'name');

    res.json({
        ok: true,
        medicos
    });
}


const addDoctor = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoSaved = await medico.save();

        res.json({
            ok: true,
            medico: medicoSaved
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error...'
        });
    }
}


const updateDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'update doctor'
    });
}


const deleteDoctor = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete doctor'
    });
}

module.exports = {
    getDoctor,
    addDoctor,
    updateDoctor,
    deleteDoctor
}