const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { Rental } = require("./models/rental");
const { User } = require("./models/user");
const { Customer } = require("./models/customer");
const date = require("date-and-time");
const mongoose = require("mongoose");
const config = require("config");
const bcrypt = require("bcrypt");
const moment = require("moment");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Get Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Ride Along", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Jumanji", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "John Wick", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Gray Man", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Bullet Train", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "La La Land", numberInStock: 10, dailyRentalRate: 2 },
      { title: "West Side Story", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "Parasite", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Get Out", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Joker", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Anime",
    movies: [
      {
        title: "Demon Slayer: Mugen Train",
        numberInStock: 4,
        dailyRentalRate: 2,
      },
      { title: "Jujutsu Kaisen 0", numberInStock: 9, dailyRentalRate: 2 },
      { title: "One Piece: Red", numberInStock: 14, dailyRentalRate: 2 },
    ],
  },
];

const customers = [
  { name: "Johnson", isGold: true, phone: "07 456 2657" },
  { name: "Steve", isGold: false, phone: "08 1234 5674" },
  { name: "Bennet", isGold: true, phone: "01 890 6758" },
  { name: "Shawn", isGold: false, phone: "04 123 4678" },
  { name: "Carter", isGold: false, phone: "06 789 2345" },
  { name: "Michael", isGold: true, phone: "04 711 9087" },
  { name: "Ryans", isGold: false, phone: "03 790 4879" },
  { name: "Jordan", isGold: false, phone: "08 789 1748" },
  { name: "Tyson", isGold: false, phone: "06 734 2346" },
  { name: "Jackson", isGold: false, phone: "01 787 9754" },
];

const rentals = [
  {
    customer: { name: "Johnson", isGold: true, phone: "07 456 2657" },
    movie: { title: "Parasite", dailyRentalRate: 2 },
    dateOut: new Date("December 15, 2020"),
  },
  {
    customer: { name: "Johnson", isGold: true, phone: "07 456 2657" },
    movie: { title: "Get Out", dailyRentalRate: 2 },
    dateOut: new Date("August 25, 2022"),
  },
  {
    customer: { name: "Steve", isGold: false, phone: "08 1234 5674" },
    movie: { title: "Get Out", dailyRentalRate: 2 },
    dateOut: new Date("March 13, 2022"),
  },
  {
    customer: { name: "Bennet", isGold: true, phone: "01 890 6758" },
    movie: { title: "Joker", dailyRentalRate: 2 },
    dateOut: new Date("July 20, 2021"),
  },
  {
    customer: { name: "Bennet", isGold: true, phone: "01 890 6758" },
    movie: { title: "Jumanji", dailyRentalRate: 2 },
    dateOut: new Date("June 23, 2020"),
  },
  {
    customer: { name: "Shawn", isGold: false, phone: "04 123 4678" },
    movie: { title: "The Notebook", dailyRentalRate: 2 },
    dateOut: new Date("April 01, 2021"),
  },
  {
    customer: { name: "Carter", isGold: false, phone: "06 789 2345" },
    movie: { title: "La La Land", dailyRentalRate: 2 },
    dateOut: new Date("May 27, 2020"),
  },
  {
    customer: { name: "Michael", isGold: true, phone: "04 711 9087" },
    movie: { title: "Get Out", dailyRentalRate: 2 },
    dateOut: new Date("February 22, 2021"),
  },
  {
    customer: { name: "Michael", isGold: true, phone: "04 711 9087" },
    movie: { title: "West Side Story", dailyRentalRate: 2 },
    dateOut: new Date("December 17, 2016"),
  },
  {
    customer: { name: "Michael", isGold: true, phone: "04 711 9087" },
    movie: { title: "Demon Slayer: Mugen Train", dailyRentalRate: 2 },
    dateOut: new Date("January 29, 2021"),
  },
  {
    customer: { name: "Ryans", isGold: false, phone: "03 790 4879" },
    movie: { title: "Demon Slayer: Mugen Train", dailyRentalRate: 2 },
    dateOut: new Date("December 17, 1995"),
  },
  {
    customer: { name: "Jordan", isGold: false, phone: "08 789 1748" },
    movie: { title: "Get Hard", dailyRentalRate: 2 },
    dateOut: new Date("October 17, 2022"),
  },
  {
    customer: { name: "Jordan", isGold: false, phone: "08 789 1748" },
    movie: { title: "The Notebook", dailyRentalRate: 2 },
    dateOut: new Date("January 01, 2021"),
  },
  {
    customer: { name: "Tyson", isGold: false, phone: "06 734 2346" },
    movie: { title: "Ride Along", dailyRentalRate: 2 },
    dateOut: new Date("October 31, 2020"),
  },
  {
    customer: { name: "Jackson", isGold: false, phone: "01 787 9754" },
    movie: { title: "Jumanji", dailyRentalRate: 2 },
    dateOut: new Date("September 12, 2020"),
  },
];

const users = [
  {
    name: "Saveer",
    email: "saveer@domain.com",
    password: "admin1234",
    isAdmin: true,
  },
  {
    name: "Admin",
    email: "admin@domain.com",
    password: "admin1234",
    isAdmin: true,
  },
  {
    name: "basicUser",
    email: "user@domain.com",
    password: "12345678",
    isAdmin: false,
  },
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Movie.deleteMany({});
  await Genre.deleteMany({});
  await Customer.deleteMany({});
  await Rental.deleteMany({});
  await User.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map((movie) => ({
      ...movie,
      genre: { _id: genreId, name: genre.name },
    }));
    await Movie.insertMany(movies);
  }

  for (let customer of customers) {
    let newCustomer = new Customer({
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    });
    await newCustomer.save();
  }
  for (let rental of rentals) {
    let customer = await Customer.find({
      name: rental.customer.name,
      isGold: rental.customer.isGold,
      phone: rental.customer.phone,
    });

    let movie = await Movie.find({
      title: rental.movie.title,
      dailyRentalRate: rental.movie.dailyRentalRate,
    });

    const rentalDays = moment().diff(rental.dateOut, "days");
    const rentalFee = rentalDays * rental.movie.dailyRentalRate;

    let newRental = new Rental({
      customer: {
        _id: customer[0]._id,
        isGold: customer[0].isGold,
        name: customer[0].name,
        phone: customer[0].phone,
      },
      movie: {
        _id: movie[0]._id,
        title: movie[0].title,
        dailyRentalRate: movie[0].dailyRentalRate,
      },
      dateOut: rental.dateOut,
      dateReturned: rental.dateReturned,
      rentalFee: rentalFee,
    });

    await newRental.save();
  }

  for (let user of users) {
    newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    if (user.isAdmin === true) newUser.isAdmin = true;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
  }

  mongoose.disconnect();

  console.info("Database updated successfully");
}

seed();
