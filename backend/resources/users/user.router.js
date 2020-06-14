const express = require("express");
const router = express.Router();
const UserService = require("./user.services");

const userService = new UserService();

router.route("/login").post(async (req, res, next) => {
  const { email, password } = req.body;
  const userResponse = await userService.loginUser(email, password);
  const { status, ...message } = userResponse;
  res.status(status).json(message);
});

router.route("/signup").post(async (req, res, next) => {
  const { email, password } = req.body;
  userService
    .createUser(email, password)
    .then((result) => {
      res.status(200).json({
        message: result,
        error: "",
      });
    })
    .catch((err) => {
      const { error } = err;
      res.status(409).json({
        message: err.errors.email.message,
      });
    });
});
module.exports = router;
