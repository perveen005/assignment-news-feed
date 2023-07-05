const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "Access token not found",
    });
  }

  jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Invalid access token",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
