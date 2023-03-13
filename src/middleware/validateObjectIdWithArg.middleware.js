const mongoose = require("mongoose");

// Another middleware function to check the ID parameter.
module.exports = (id) => {
  return function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params[id]))
      return res
        .status(401)
        .send({ success: false, message: `Invalid ${id} ID` });

    next();
  };
};
