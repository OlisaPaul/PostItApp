const validateMiddleware = require("../middleware/validate");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../model/user");
const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middleware/async");
const validateObjectId = require("../middleware/validateObjectId");
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
