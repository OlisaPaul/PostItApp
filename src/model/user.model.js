const _ = require("lodash");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 255,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true,
    required: true,
  },
  isAdmin: Boolean,
  isDeleted: Boolean,
  avatarUrl: {
    type: String,
    required: true,
  },
  avatarImgTag: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, name: this.name },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(5).max(1024).required(),
    email: Joi.string().email().min(5).max(255).required(),
    username: Joi.string().min(4).max(255).required(),
  });

  return schema.validate(user);
}

function validatePatch(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255),
    password: Joi.string().min(5).max(1024),
    email: Joi.string().email().min(5).max(255),
  });

  return schema.validate(user);
}

exports.validatePatch = validatePatch;
exports.validate = validate;
exports.User = User;
