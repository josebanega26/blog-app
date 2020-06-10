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
      console.log("result", result);
      res.status(200).json({
        message: result,
        error: "",
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        error: error,
      });
    });
});
module.exports = router;
