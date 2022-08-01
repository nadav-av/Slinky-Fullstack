const express = require("express");
const users = require("./server/routes/users");
const notifications = require("./server/routes/notification/notification");
const booking = require("./server/routes/Booking/booking");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use("/booking", booking);
app.use("/users", users);
app.use("/notifications", notifications);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || "3042";

app.listen(port, () => {
  console.log("Server started on port", port);
});
