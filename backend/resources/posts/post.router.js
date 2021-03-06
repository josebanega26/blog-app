const express = require("express");
const router = express.Router();
const PostService = require("./post.services");
const multer = require("multer");
const { MIME_TYPE } = require("../../utils/constanst");
const verifyAuth = require("../../utils/middlewares/verifyAuth");
const postService = new PostService();

// Config to get the Image and save in backend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("the file ext is invalid");
    if (isValid) {
      error = "";
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    console.log("file.originalName", file.originalName);
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const fileExt = MIME_TYPE[file.mimetype];
    cb(null, `${name}-${Date.now()}.${fileExt}`);
  },
});
router
  .route("/")
  .get(async (req, res, next) => {
    // The tags are the some params that comes in the url after some ? ,
    const tags = req.query;
    const posts = await postService.get(tags);
    res.status(200).send({
      message: "posts fetched suceffuly",
      ...posts,
    });
  })
  .post(
    verifyAuth,
    multer({ storage: storage }).single("image"),
    async (req, res, next) => {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = url + "/images/" + req.file.filename;
      console.log("userdata", req);
      const { body, title } = req.body;
      const post = {
        title,
        body,
        imagePath: imagePath,
        creator: req.userData.userId,
      };
      const postAdded = await postService.add(post);
      res.status(201).json({
        message: "post added suceffuly",
        postAdded: postAdded,
      });
    }
  );

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
  .put(
    verifyAuth,
    multer({ storage: storage }).single("image"),
    async (req, res, next) => {
      let imagePath = req.body.imagePath;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
      }
      const { id } = req.params;
      const body = { ...req.body, creator: req.userData.userId };
      const postUpdate = await postService.update(id, body, imagePath);
      const { status, ...message } = postUpdate;
      res.status(status).json({
        message,
      });
    }
  )
  .delete(verifyAuth, async (req, res, next) => {
    const { id } = req.params;
    console.log("userdata", req.userData);
    const userId = req.userData.userId;
    const postDeleted = await postService.delete(id, userId);
    const { status, ...message } = postDeleted;
    res.status(status).json({
      ...message,
    });
  });
module.exports = router;
