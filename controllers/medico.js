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


const updateDoctor = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(401).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        const cambios = {
            ...req.body,
            usuario: uid
        }

        const m_updated = await Medico.findByIdAndUpdate(id, cambios, { new: true });

        res.json({
            ok: true,
            medico: m_updated
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}


const deleteDoctor = async(req, res = response) => {
    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(401).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }



        const m_deleted = await Medico.findByIdAndRemove(id, { new: true });

        res.json({
            ok: true,
            medico: m_deleted
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
}

module.exports = {
    getDoctor,
    addDoctor,
    updateDoctor,
    deleteDoctor
}