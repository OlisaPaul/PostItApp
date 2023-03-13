const auth = require("../middleware/auth.middleware");
const validateMiddleware = require("../middleware/validate.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const validateObjectIdWithArg = require("../middleware/validateObjectIdWithArg.middleware");
const asyncMiddleware = require("../middleware/async.middleware");
const postController = require("../controllers/post.controller");
const { Post, validate, validatePatch } = require("../model/post.model");
const { User } = require("../model/user.model");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  // the asyncMiddleware function is used to handle promise rejection
  asyncMiddleware(postController.fetchAllPost)
);

router.get(
  "/:id",
  [validateObjectId],
  asyncMiddleware(postController.getPostById)
);

router.get(
  "/user/:id",
  [validateObjectId],
  asyncMiddleware(postController.getPostsByUserId)
);

router.get(
  "/:postId/user/:userId",
  validateObjectIdWithArg("postId"),
  validateObjectIdWithArg("userId"),
  asyncMiddleware(postController.getPostByUserId)
);

router.put(
  "/:id",
  [validateMiddleware(validatePatch), validateObjectId, auth],
  // validateObjectId is a middleware, it makes sure that the postId parameter is of the right mongoose Id format.
  asyncMiddleware(postController.updatePost)
);

router.post(
  "/",
  [validateMiddleware(validate), auth],
  asyncMiddleware(postController.newPost)
);

router.delete(
  "/:id",
  [validateObjectId, auth],
  asyncMiddleware(postController.deletePost)
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
