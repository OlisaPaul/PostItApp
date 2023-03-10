const mongoose = require("mongoose");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");
const validateObjectId = require("../middleware/validateObjectId");
const asyncMiddleware = require("../middleware/async");
const express = require("express");
const router = express.Router();
const { Comment, validate, validatePatch } = require("../model/comment");
const { Post } = require("../model/post");
const commentController = require("../controllers/comment.controller");

router.post(
  "/",
  [validateMiddleware(validate)],
  asyncMiddleware(commentController.createComment)
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
