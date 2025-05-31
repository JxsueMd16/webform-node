// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { poolCorreos } = require('./db');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ruta para mostrar las cuentas de correo
app.get('/usuarios-correo', async (req, res) => {
    try {
        const [rows] = await poolCorreos.query('SELECT username, name, quota, domain FROM mailbox');
        res.render('usuarios', { usuarios: rows });
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).send('Error al cargar usuarios de correo.');
    }
});

const agendaRoutes = require('./routes/agenda');
app.use('/', agendaRoutes);


// Levantar el servidor
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor funcionando en http://0.0.0.0:3000');
});
