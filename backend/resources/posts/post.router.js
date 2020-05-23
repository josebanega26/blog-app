const express = require("express");
const router = express.Router();
const postMock = require("../../utils/mock/post");
router.route("/").all((req, res, next) => {
  res.status(200).send({
    msg: "posts fetched suceffuly",
    posts: postMock,
  });
});

module.exports = router;
