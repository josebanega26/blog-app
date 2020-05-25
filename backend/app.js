const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const postRouter = require("./resources/posts/post.router");
const MongoLib = require("./lib/mongo");

console.log("MongoLib", new MongoLib());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, X-request-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/post", postRouter);

app.use((req, res, next) => {
  res.status(200).json({
    msg: " server it's working",
  });
  console.log("Error handler");
});

module.exports = app;
