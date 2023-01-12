const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Endpoint 1 Get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

//Endpoint 2 Get a customer form id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    res.status(404).send("The customer with the given id was not found");
  res.send(customer);
});

//Endpoint 3 Create a customer
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let customer = new Customer({
    name: req.body.name,
    isGold: {
      default: false,
    },
  });
  customer = await customer.save();
  res.send(customer);
});

//Endpoint 4 Update an existing customer
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const customer = await Customer.findById(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!customer) {
    res.status(404).send("The customer with the given id was not found");
  }
  res.send(customer);
});

//Endpoint 5 Delete a customer
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404).send("ID is not valid");
    return;
  }
  console.log(Customer.findById(req.params.id));
  const customer = await Customer.findByIdAndRemove(req.params.id); //Find the customer and delete

  if (!customer) {
    //If customer not found return 404
    res.status(404).send("The customer with the given ID was not found.");
  }

  res.send(customer); //Return the customer
});

module.exports = router;
