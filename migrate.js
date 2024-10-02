require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { REACT_DB_HOST, REACT_DB_USER, REACT_DB_PASSWORD, REACT_DB_NAME } = process.env;
  const connection = await mysql.createConnection({
    host: REACT_DB_HOST,
    user: REACT_DB_USER,
    password: REACT_DB_PASSWORD,
    multipleStatements: true,
    database: REACT_DB_NAME,
  });
  console.log(connection);
  
  await connection.query(`create database ${REACT_DB_NAME}`);
  await connection.query(`use ${REACT_DB_NAME}`);

  const sql = fs.readFileSync("./asset/coordonnees_gps.sql", "utf8");

  await connection.query(sql);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
