const express = require("express");
// const bookingRouter = require('../server/server/routes/booking/booking');
const users = require("./server/routes/users");
const booking = require('./server/routes/booking/booking');
const logger = require("./server/middleware/logger.js");
// const auth = require("./server/middleware/auth.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use("/booking", booking);
// app.use(bookingRouter);
app.use("/users", users);

const port = process.env.PORT || "3001";

// process.on('unhandledRejection', (reason, promise) => {
//   console.log("Unhandled Rejection", reason.message);
// });
// process.on('uncaughtException', (error) => {
//   console.log("Uncaught Exception", error.message);
//   throw error
// });

app.listen(port, () => {
  console.log("THIS IS MY CONSOLE");
  console.log("Server started on port", port);
});
