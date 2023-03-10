const { User } = require("../model/user");
const { Post } = require("../model/post");
const { Comment } = require("../model/comment");
const commentService = require("../services/comment.service");
const userService = require("../services/user.service");
const constants = require("../constants");
const { errorMessage, successMessage } = require("../messages");
const { MESSAGES } = constants;

class CommentController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }
  //Create a new comment

  async createComment(req, res) {
    const user = await User.findById(req.body.userId);

    if (!user) res.status(404).send(errorMessage(user));

    const post = await Post.findById(req.body.postId);

    if (!post) res.status(404).send(errorMessage(post));

    let comment = new Comment({
      comment: req.body.comment,
      userId: req.body.userId,
      postId: req.body.postId,
    });

    await commentService.createComment(comment);

    // Sends the created comment as response
    res.send(comment);
  }
}

module.exports = new CommentController();
