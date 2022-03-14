const mysql = require('mysql2');

// Connecting .env file to I can hide my credentials from being posted to github
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = db;