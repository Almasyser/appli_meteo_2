require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.REACT_DB_HOST, 
  port: process.env.REACT_DB_PORT, 
  user: process.env.REACT_DB_USER,
  password: process.env.REACT_DB_PASSWORD,
  database: process.env.REACT_DB_NAME,
});

module.exports = connection;