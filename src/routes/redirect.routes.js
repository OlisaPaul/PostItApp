const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("https://documenter.getpostman.com/view/22093717/2s93JtR4Mm");
});

module.exports = router;
