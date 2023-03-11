const mongoose = require("mongoose");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const asyncMiddleware = require("../middleware/async.middleware");
const express = require("express");
const router = express.Router();
const { Comment, validate, validatePatch } = require("../model/comment.model");
const { Post } = require("../model/post.model");
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

router.delete(
  "/:id",
  [validateObjectId, auth, admin],
  asyncMiddleware(commentController.deleteComment)
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
