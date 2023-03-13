// Joi is used for data validation
const Joi = require("joi");
const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId.middleware");

// The schema determines the structure of the comment collection
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    // required makes sure the name is provided by the client.
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  isDeleted: Boolean,
});

const Comment = mongoose.model("comment", commentSchema);

//To validate the data before sending to the database
function validate(comment) {
  const schema = Joi.object({
    comment: Joi.string().min(4).max(500).required(),
    userId: Joi.objectId().required(),
    postId: Joi.objectId().required(),
  });

  return schema.validate(comment);
}

function validatePatch(comment) {
  const schema = Joi.object({
    comment: Joi.string().min(5).max(500).required(),
  });

  return schema.validate(comment);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Comment = Comment;
exports.commentSchema = commentSchema;
