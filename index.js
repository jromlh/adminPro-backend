require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dbConnection/dbConfig');
const app = express();

/* 
h1PmSBxZAk5FZuic
anakin */

/* Llamado a la función de conexión de bd */
dbConnection();

/* Variables de entorno 
console.log(process.env);
*/

/* Middleware */
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        ok: 'true',
        msg: 'Welcome to this server app'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto ${process.env.PORT}`);
});