const mysql = require('mysql2');

// Connecting .env file to I can hide my credentials from being posted to github
require('dotenv').config();

// The Below style of creating a connection does not work with .end() method?? strange
// const dbConfig = {
//     host: 'localhost',
//     user: process.env.DB_USER,
//     password: process.env.DB_PW,
//     database: process.env.DB_NAME
// };

// // Connect to databse
// const db = mysql.createConnection(dbConfig,
//     console.log(`Now connected to ${process.env.DB_NAME}`)
// ).promise // <== Enable promise based syntax

// database config, Also using the dotenv npm to hide password and user in .env
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});

module.exports = connection;