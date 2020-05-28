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
    const posts = await postService.get(tags);
    res.status(200).send({
      msg: "posts fetched suceffuly",
      posts: posts,
    });
  })
  .post(async (req, res, next) => {
    const { body, title } = req.body;
    const post = { title, body };
    const postId = await postService.add(post);
    res.status(201).json({
      message: "post added suceffuly",
      postId,
    });
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    const { id } = req.params;
    const post = await postService.getById(id);
    res.status(200).json({
      post: post,
      message: "message sucessfully",
    });
  })
  .put(async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    const postUpdate = await postService.update(id, body);
    res.status(200).json({
      message: "post updated sucessfully",
      post: postUpdate,
    });
  })
  .delete(async (req, res, next) => {
    const { id } = req.params;
    const postDeleted = await postService.delete(id);
    res.status(200).json({
      message: "post delete sucessfully",
    });
  });
module.exports = router;
