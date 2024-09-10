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

app.post("/movies", async (req, res) => {
  const movie = req.body;

  try {
    const newMovie = new Movies(movie);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/movies/:movieId`, async (req, res) => {
  const movieId = req.params.movieId;
  const movie = req.body;

  try {
    const updatedMovie = await Movies.findByIdAndUpdate(movieId, movie);

    if (!updatedMovie) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res
        .status(200)
        .json({ message: "Movie updated successfully", movie: updatedMovie });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete(`/movies/:movieId`, async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
