const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const deleteOldImage = (path) => {
    /* con fs podemos preguntarnos si existe el path y borrar la imagen de antes */
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateImageDB = async(coleccion, id, fileName) => {

    let oldPATH = '';

    switch (coleccion) {
        case 'usuarios':
            const user = await Usuario.findById(id);
            if (!user) {
                console.log('User not found');
                return false;
            }

            oldPATH = `./uploads/usuarios/${user.img}`;
            deleteOldImage(oldPATH);

            user.img = fileName;
            await user.save();
            return true;

            break;


        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Hospital not found');
                return false;
            }

            oldPATH = `./uploads/hospitales/${hospital.img}`;
            deleteOldImage(oldPATH);

            hospital.img = fileName;
            await hospital.save();
            return true;

            break;


        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('Doctor not found');
                return false;
            }

            oldPATH = `./uploads/medicos/${medico.img}`;
            deleteOldImage(oldPATH);

            medico.img = fileName;
            await medico.save();
            return true;

            break;
    }

}

module.exports = {
    updateImageDB
}