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
app.use(express.json()); //lectora y parseo del body

/* Routes */
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/hospitales', require('./routes/hospital'));
app.use('/api/medicos', require('./routes/medico'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/busqueda', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/upload'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor en el puerto ${process.env.PORT}`);
});