const express = require("express");
const app = express();
const users = require("./server/routes/users");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname + "/server/public")));

app.use(express.json());
app.use(cors());

app.use(logger);
app.use("/users", users);

const port = process.env.PORT || "3001";

app.listen(port, () => {
  console.log("THIS IS MY CONSOLE");
  console.log("Server started on port", port);
});
