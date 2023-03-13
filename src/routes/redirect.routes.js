const express = require("express");
const router = express.Router();

// this use to redirect a user to to the postman documentation.
router.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/22093717/2s93JtR4Mm");
});

module.exports = router;
