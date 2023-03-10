const auth = require("../middleware/auth");

const validateMiddleware = require("../middleware/validate");
const asyncMiddleware = require("../middleware/async");
const postController = require("../controllers/post.controller");
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

router.post(
  "/",
  [validateMiddleware(validate), auth],
  asyncMiddleware(postController.newPost)
);

router.patch(
  "/:id",
  [validateMiddleware(validatePatch), validateObjectId, auth],
  // validateObjectId is a middleware, it makes sure that the postId parameter is of the right mongoose Id format.
  asyncMiddleware(postController.updatePost)
);

// Exports the router object which will  be used in the ../startup/routes.js files
module.exports = router;
