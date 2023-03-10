const { User } = require("../model/user");
const { Post } = require("../model/post");
const postService = require("../services/post.service");
const constants = require("../constants");
const { errorMessage, successMessage, unAuthMessage } = require("../messages");
const { MESSAGES } = constants;

class PostController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  async newPost(req, res) {
    // Checks for duplicacy
    const user = await User.findById(req.body.userId);

    if (!user) res.status(404).send(errorMessage(user));

    let post = new Post({
      post: req.body.post,
      userId: req.body.userId,
    });

    post = await post.save();

    // Sends the created post as response
    res.send(successMessage(MESSAGES.CREATED, post));
  }
}

module.exports = new PostController();
