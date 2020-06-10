const jwt = require("jsonwebtoken");
const { config } = require("../../config");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secret);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "User is not verify", err });
  }
};

module.exports = verifyAuth;
