# MovieRentals

MERN Full Stack Application

Setup:
Back End:

Install MongoDB: Install the latest version of MongoDB and make sure its running

Install Dependencies: Navigate to nodejs folder and use the command "npm i" to install dependencies

Populate the Database: Navigate to the NodeJS folder and use the command "node seed.js", there are two admin accounts that will be stored in the database read About version 1.0.0: below for more details.

Optional: Run Automated Tests: Use the command "npm test", to make sure theres no errors before you start the server

Start Back End Server: use the command "node index.js", logfile.log will show two messages showing what port its running on and that its connected to mongodb

Front End:

Installing Dependencies: use another terminal to navigate to react folder and use the command "npm i"

Start Front End Server: Navigate to the react folder and use the command "npm start", this will start the server on http://localhost:3000

Screenshots have been provided to show how the website should work.

Current version 1.0.0:

About version 1.0.0:

Back End:

Back End has been created using NodeJS, Express, MongoDB

Responsible for holding infromation on Movies, Customers, Users, Rentals and Genre on the MongoDB database

Running on localhost:3900

Back End uses winston to log errors to logfile.log and any uncaught exceptions to uncaughtExceptions.log

Back End has been tested using Jest to perform automated unit and integration tests and currently has a coverage of 64.88% with the tests

The routes have the lowest test coverage currently at 50% and will by improved in future versions.

A seed.js file has been provided which will populate the database which is done by navigating to the NodeJS folder through terminal and using the command "node seed.js". There are two admin accounts, new users can be made but not admin accounts, the login information for both is as follows:
1. Email: saveer@domain.com
   Password: admin1234
   
1. Email: admin@domain.com
   Password: admin1234
  
Will be adding a feature to allow admins to make regular users admins in future updates.

Front End:
Front End has been created using React

Allows people to register and become users allowing them to add movies to the website and allows admins access to customers and rentals page, giving them permission to view and delete.

Movies page is the home page and shows all the movies currently stored in the database, which they can filter by genre, sort by different requirements and even search through.

Customers page is only visible to admins and allows admins to view customer information and sort by different requirements such as membership type, which sorts customers by their membership allowing admins to find infromation on higher priority members first. The admins are also able to delete customers from the database and will soon be able to edit customer details by the next update.

Rentals Page is only visible to admins and allows admins to view rental information such as movie and customer information, date it was borrowed, date returned and rental fee(rental fee will increase if movie has not been returned).

Running on localhost:3900 and connects to the back end by making api calls to localhost:3900

Will be implementing a customer login interface where they will be able to see the movies they renting/rented and other information such as rental fees that must be paid

Will be implementing automated tests for the front end in future updates
