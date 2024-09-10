const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
  releaseYear: Number,
});

const Movies = mongoose.model("More-movies", movieSchema);

module.exports = { Movies };
