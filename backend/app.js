const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const postRouter = require("./resources/posts/post.router");
const userRouter = require("./resources/users/user.router");
const MongoLib = require("./lib/mongo");
const cors = require("cors");
const mongoLib = new MongoLib();
mongoLib.connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  res.status(200).json({
    msg: " server it's working",
  });
});

module.exports = app;
