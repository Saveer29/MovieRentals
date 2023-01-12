const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Endpoint 1 Get all rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

//Endpoint 2 Get a rental from id
router.get("/:id", async (req, res) => {
  const rental = await rental.findById(req.params.id);
  if (!rental)
    res.status(404).send("The rental with the given id was not found");
  res.send(rental);
});

//Endpoint 3 Create a rental
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId); // Find customer by id
  if (!customer) {
    res.status(404).send("The customer with the given ID was not found."); // Return 404 if not found
  }

  const movie = await Movie.findById(req.body.movieId); // Find movie by id
  if (!movie) {
    res.status(404).send("The movie with the given ID was not found."); // Return 404 if not found
  }
  if (movie.numberInStock === 0) {
    return res.status(400).send("Movie not in stock");
  }
  let rental = new rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
  res.send(rental);
});

//Endpoint 4 Update an existing rental
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const rental = await rental.findById(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!rental) {
    res.status(404).send("The rental with the given id was not found");
  }
  res.send(rental);
});

//Endpoint 5 Delete a rental
router.delete("/:id", async (req, res) => {
  const rental = rental.findByIdAndRemove(req.params.id); //Find the rental and delete

  if (!rental) {
    //If rental not found return 404
    res.status(404).send("The rental with the given ID was not found.");
  }

  res.send(rental); //Return the rental
});

module.exports = router;
