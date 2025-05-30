// db.js
const mysql = require('mysql2/promise');

// Cambia estos datos por los de tu servidor
const pool = mysql.createPool({
    host: 'localhost',
    user: 'usuarioform',
    password: 'clave123',
    database: 'webformdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool;
