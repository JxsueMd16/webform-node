// db.js
const mysql = require('mysql2/promise');

// Conexión para la base de datos webformdb 
const poolWebform = mysql.createPool({
    host: 'localhost',
    user: 'usuarioform',
    password: 'clave123',
    database: 'webformdb'
});

// Conexión para la base de datos vmail 
const poolCorreos = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'jxxmd16',
    database: 'vmail'
});

module.exports = { poolWebform, poolCorreos };
