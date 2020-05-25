const express = require("express");
const router = express.Router();
const postMock = require("../../utils/mock/post");
const Post = require("./post.model");
const PostService = require("./post.services");

const postService = new PostService();
router
  .route("/")
  .get(async (req, res, next) => {
    // The tags are the some params that comes in the url after some ? ,
    const { tags = {} } = req.query;
    // const data = await productService.getProducts(tags);
    const posts = await postService.getPosts(tags);
    console.log("New Posts", posts);
    res.status(200).send({
      msg: "posts fetched suceffuly",
      posts: posts,
    });
  })
  .post((req, res, next) => {
    const { body, title } = req.body;
    const post = new Post({ title, body });
    console.log("post", post);
    post.save();
    res.status(201).json({
      message: "post added suceffuly",
    });
  });

module.exports = router;
