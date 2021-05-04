const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'name');

    res.json({
        ok: true,
        hospitales
    });
}


const addHospitals = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalSaved = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalSaved
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Unexpected error...'
        });

    }
}


const updateHosppitals = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {


        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(401).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const cambios = {
            ...req.body,
            usuario: uid
        };

        const h_updated = await Hospital.findByIdAndUpdate(id, cambios, { new: true });

        res.json({
            ok: true,
            Hospital: h_updated
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error...'
        });

    }
}


const deleteHospitals = async(req, res = response) => {
    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(401).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const h_deleted = await Hospital.findByIdAndRemove(id, { new: true });

        res.json({
            ok: true,
            Hospital: h_deleted
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
    getHospitals,
    addHospitals,
    updateHosppitals,
    deleteHospitals
}