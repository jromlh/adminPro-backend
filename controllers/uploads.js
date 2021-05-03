const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImageDB } = require('../helpers/uploads');
const PATH = require('path');
const fs = require('fs');


const getImage = (req, res = response) => {
    const { coleccion, img } = req.params;

    const path_img = PATH.join(__dirname, `../uploads/${ coleccion }/${ img }`);

    /* Verificamos el PATH */
    if (!fs.existsSync(path_img)) {
        return res.sendFile(PATH.join(__dirname, `../uploads/no-img.jpg`));
    }

    res.sendFile(path_img);

}


const uploadFile = async(req, res = response) => {

    const { coleccion, id } = req.params;

    /* Validar la colección */
    const colecciones = ['medicos', 'usuarios', 'hospitales'];
    if (!colecciones.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: 'Collection not valid'
        });
    }

    /* Validamos que exista un archivo */
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'There is not an image to upload'
        });
    }

    /* procesar la imagen */
    const file = req.files.imagen;
    //console.log(file);
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    /* validar la extensión del archivo */
    const extensionesValidas = ['png', 'jpeg', 'jpg'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'There is not an extension valid to upload'
        });
    }

    /* generamos el nombre del archivo */
    const fileName = `${ uuidv4() }.${ extension }`;

    /* generamos el PATH */
    const path = `./uploads/${ coleccion }/${ fileName }`;

    /* Mover el archivo al servidor */
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'There was an error to upload the image'
            });
        }

        /* Actualizar la base de datos */
        updateImageDB(coleccion, id, fileName);

        res.status(200).json({
            ok: true,
            msg: 'File uploaded',
            fileName
        });

    });





}




module.exports = {
    uploadFile,
    getImage
}