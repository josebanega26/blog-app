const jwt = require("jsonwebtoken");
const { config } = require("../../config");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedCode = jwt.verify(token, config.secret);
    req.userData = { email: decodedCode.email, userId: decodedCode.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: "User is not verify", err });
  }
};

module.exports = verifyAuth;
