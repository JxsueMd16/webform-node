// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ruta para el formulario
app.get('/', (req, res) => {
    res.render('formulario');
});

// Ruta para guardar los datos
app.post('/guardar', async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    try {
        await pool.query(
            'INSERT INTO contactos (nombre, correo, mensaje) VALUES (?, ?, ?)',
            [nombre, correo, mensaje]
        );
        res.send('✅ Datos guardados correctamente en la base de datos.');
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        res.status(500).send('❌ Error al guardar en la base de datos.');
    }
});

// Levantar el servidor
app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
