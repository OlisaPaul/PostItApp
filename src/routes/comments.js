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

router.get(
  "/",
  // the asyncMiddleware function is used to handle promise rejection
  asyncMiddleware(commentController.fetchAllComment)
);

router.get("/post/:id", asyncMiddleware(commentController.getCommentByPostId));

router.get("/:id", asyncMiddleware(commentController.getCommentById));

router.post(
  "/",
  [validateMiddleware(validate)],
  asyncMiddleware(commentController.createComment)
);

router.patch(
  "/:id",
  [validateMiddleware(validatePatch), validateObjectId, auth],
  // validateObjectId is a middleware, it makes sure that the commentId parameter is of the right mongoose Id format.
  asyncMiddleware(commentController.updateComment)
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
