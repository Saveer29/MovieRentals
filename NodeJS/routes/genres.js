const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");

//Endpoint 1 Get list of all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//Endpoint 2 Get a genre
router.get("/:id", validateObjectId, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }
  const genre = await Genre.findById(req.params.id); // Find genre by id

  if (!genre) {
    res.status(404).send("The genre with the given ID was not found.");
    return; // Return 404 if not found
  }
  res.send(genre);
  return;
});

//Endpoint 3 Create a new genre -- POST request
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

//Endpoint 4 Update an existing genre
router.put("/:id", auth, async (req, res) => {
  //validate - if invalid return 400 error
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }

  //Look up the course and update
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  //If not found return 404 error
  if (!genre) {
    res.status(404).send("The genre with the given ID was not found.");
    return;
  }

  // Return the new Genre
  res.send(genre);
});

//  Endpoint 5 Delete
router.delete("/:id", [auth, admin], async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }

  const genre = await Genre.findByIdAndRemove(req.params.id); //Find the Genre and delete

  if (!genre) {
    //If genre not found return 404
    res.status(404).send("The genre with the given ID was not found.");
    return;
  }

  res.send(genre); //Return the Genre
});

module.exports = router;
