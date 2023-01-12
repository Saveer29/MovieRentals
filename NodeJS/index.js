const winston = require("winston");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation");
require("./startup/prod")(app);

// PORT
const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
  winston.info(`Listening on Port ${port}`)
);

module.exports = server;
