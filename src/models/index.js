require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database
const { REACT_DB_HOST, REACT_DB_PORT, REACT_DB_USER, REACT_DB_PASSWORD, REACT_DB_NAME } = process.env;
const pool = mysql.createPool({
  host: REACT_DB_HOST,
  port: REACT_DB_PORT,
  user: REACT_DB_USER,
  password: REACT_DB_PASSWORD,
  database: REACT_DB_NAME,
});

// try a connection
pool.getConnection()
.then(()=>{
  console.log("database OK");
  
})
.catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers
const models = {};


// CITIES
const cityManager = require("./cityManagers");

models.cities = new cityManager();
models.cities.setDatabase(pool);





const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
