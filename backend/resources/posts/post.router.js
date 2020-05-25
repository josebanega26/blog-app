const express = require("express");
const router = express.Router();
const postMock = require("../../utils/mock/post");
const Post = require("./post.model");
router
  .route("/")
  .get((req, res, next) => {
    res.status(200).send({
      msg: "posts fetched suceffuly",
      posts: postMock,
    });
  })
  .post((req, res, next) => {
    const { body, title } = req.body;
    const post = new Post({ title, body });
    console.log("post", post);
    res.status(201).json({
      message: "post added suceffuly",
    });
  });

module.exports = router;
