const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Not authenticated!" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    res.status(401).json({ message: "Not authenticated!" });
  }

  req.loggedUser = await User.findByPk(decodedToken.userId);

  next();
};
