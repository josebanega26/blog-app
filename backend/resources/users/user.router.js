const express = require("express");
const router = express.Router();
const UserService = require("./user.services");

const userService = new UserService();

router.route("/").post((req, res, next) => {
  console.log("users");
  res.status(200).json({
    message: "dataa",
  });
});

router.route("/signup").post(async (req, res, next) => {
  const { user, password } = req.body;
  userService
    .createUser(user, password)
    .then((result) => {
      console.log("result", result);
      res.status(200).json({
        message: result,
        error: "",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});
module.exports = router;
