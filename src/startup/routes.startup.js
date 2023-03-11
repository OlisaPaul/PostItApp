// This file determines which of the routes will be used based on the api url
const express = require("express");
const error = require("../middleware/error.middleware");
const posts = require("../routes/posts.routes");
const auth = require("../routes/auth.routes");
const users = require("../routes/users.routes");
const comments = require("../routes/comments.routes");

module.exports = function (app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // if the api is {{baseUrl}}/api/v1/posts, it uses the posts method in the router object

  app.use("/api/v1/posts", posts);
  // app.use("/api/v1/post/comments", comments);
  app.use("/api/v1/comments", comments);
  app.use("/api/v1/users", users);
  app.use("/api/v1/auth", auth);

  // it calls the error middleware if there was a rejected promise.
  app.use(error);
};
