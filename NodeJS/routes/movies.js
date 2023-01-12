const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");

//Endpoint 1 Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

//Endpoint 2 Get a movie form id
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send("The movie with the given id was not found");
  res.send(movie);
});

//Endpoint 3 Create a movie
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId); // Find genre by id
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found."); // Return 404 if not found
  }

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

//Endpoint 4 Update an existing movie
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send("ID is not valid");
  }

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genreId: req.params.genreId,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) {
    res.status(404).send("The movie with the given id was not found");
  }
  res.send(movie);
});

//Endpoint 5 Delete a movie
router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }
  const movie = await Movie.findByIdAndRemove(req.params.id); //Find the movie and delete

  if (!movie) {
    //If movie not found return 404
    res.status(404).send("The movie with the given ID was not found.");
  }
  res.send(movie); //Return the movie
});

module.exports = router;
