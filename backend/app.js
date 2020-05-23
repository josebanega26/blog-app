const express = require("express");
const app = express();
const postRouter = require("./resources/posts/post.router");

app.use(express.json());
app.use("/api/post", postRouter);

app.use((req, res, next) => {
  console.log("Error handler");
});

module.exports = app;
