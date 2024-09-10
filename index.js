const express = require("express");
const cors = require("cors");
const app = express();

// Load enviroment variables from .env file
require("dotenv").config();

const { initializeDatabase } = require("./db/db.connection");
