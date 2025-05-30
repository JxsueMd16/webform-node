// db.js
const mysql = require('mysql2/promise');

// Conexión para la base de datos webformdb (opcional, puedes eliminarla si no la usas)
const poolWebform = mysql.createPool({
    host: 'localhost',
    user: 'usuarioform',
    password: 'clave123',
    database: 'webformdb'
});

// Conexión para la base de datos vmail (de iRedMail)
const poolCorreos = mysql.createPool({
    host: 'localhost',
    user: 'root', // O un usuario de MariaDB con permisos de lectura
    password: 'jxxmd16',
    database: 'vmail'
});

module.exports = { poolWebform, poolCorreos };
