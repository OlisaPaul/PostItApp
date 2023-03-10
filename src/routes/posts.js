const auth = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");
const asyncMiddleware = require("../middleware/async");
const postController = require("../controllers/post.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  [validateMiddleware(validate), auth],
  asyncMiddleware(postController.newPost)
);
