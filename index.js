const express = require("express");
const cors = require("cors");
const app = express();

// Load enviroment variables from .env file
require("dotenv").config();

const { initializeDatabase } = require("./db/db.connection");
const { Movies } = require("./models/movie.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movies.find();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
