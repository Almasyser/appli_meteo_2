require("dotenv").config();
const cors = require("cors");
// create express app
const express = require("express");
const app = express();
const router = require("./router");
// use some application-level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.REACT_FRONTEND_URL,
    optionsSuccessStatus: 200,
  })
);
// import and mount the API routes
app.use(router);
// ready to export
module.exports = app;
