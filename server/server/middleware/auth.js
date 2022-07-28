const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log("This is the auth middleware");
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    console.log("passsss", token);
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.tokenData = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
