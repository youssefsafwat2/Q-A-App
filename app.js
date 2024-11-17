const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares

// converts the JSON data into a JavaScript object and attaches it to the req.body property
app.use(express.json());

app.use(cors());
// app.use(cors({origin:"https://frontendhost"}));

// Routes

module.exports = app;
