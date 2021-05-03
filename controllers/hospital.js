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


const updateHosppitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'update hospitals'
    });
}


const deleteHospitals = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete hospitals'
    });
}



module.exports = {
    getHospitals,
    addHospitals,
    updateHosppitals,
    deleteHospitals
}