const express = require("express");
const app = express();
const users = require("./server/routes/users");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cors());

app.use(logger);
app.use("/users", users);

const port = process.env.PORT || "3042";

app.listen(port, () => {
  console.log("Server started on port", port);
});
