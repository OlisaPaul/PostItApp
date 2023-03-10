// Joi is used for data validation
const Joi = require("joi");
const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");

// The schema determines the structure of the post collection
const postSchema = new mongoose.Schema({
  post: {
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
  isDeleted: Boolean,
});

const Post = mongoose.model("post", postSchema);

//To validate the data before sending to the database
function validate(post) {
  const schema = Joi.object({
    post: Joi.string().min(4).max(500).required(),
    userId: Joi.objectId().required(),
  });

  return schema.validate(post);
}

function validatePatch(post) {
  const schema = Joi.object({
    name: Joi.string().min(5),
    price: Joi.number().min(0).max(150000),
    postType: Joi.objectId(),
  });

  return schema.validate(post);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.Post = Post;
exports.postSchema = postSchema;
