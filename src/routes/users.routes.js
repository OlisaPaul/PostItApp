const validateMiddleware = require("../middleware/validate.middleware");
const admin = require("../middleware/admin.middleware");
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../model/user.model");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async.middleware");
const validateObjectId = require("../middleware/validateObjectId.middleware");
const userController = require("../controllers/user.controller");

// This is used for registering a new user.
router.post(
  "/",
  validateMiddleware(validate),
  asyncMiddleware(userController.register)
);

router.get("/", asyncMiddleware(userController.fetchAllUsers));

router.get(
  "/:id",
  validateObjectId,
  asyncMiddleware(userController.gethUserById)
);

router.put(
  "/:id",
  validateObjectId,
  validateMiddleware(validate),
  asyncMiddleware(userController.updateUserProfile)
);

router.delete(
  "/:id",
  validateObjectId,
  auth,
  asyncMiddleware(userController.deleteUserAccount)
);
module.exports = router;
