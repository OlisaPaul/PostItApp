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

  //get all comments in the comment collection/table
  async fetchAllComment(req, res) {
    const comments = await commentService.getAllComments();

    if (comments) {
      res.send(successMessage(MESSAGES.FETCHED, comments));
    } else {
      res.status(404).send(errorMessage(comments));
    }
  }

  //get comment from the database, using their email
  async getCommentById(req, res) {
    const comment = await commentService.getCommentById(req.params.id);

    if (comment) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment));
    }
  }

  async getCommentByPostId(req, res) {
    const comment = await commentService.getCommentByPostId(req.params.id);

    if (comment) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment));
    }
  }

  //Update/edit comment data
  async updateComment(req, res) {
    let comment = await commentService.getCommentById(req.params.id);

    if (!comment) return res.status(404).send(errorMessage(comment));

    if (req.user._id != comment.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    comment = await commentService.updateCommentById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, comment));
  }

  //Delete comment account entirely from the database
  async deleteComment(req, res) {
    let comment = await userService.getUserById(req.params.id);

    if (!comment) return res.status(404).send(errorMessage(comment));

    if (req.user._id != comment.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    await commentService.softDeleteComment(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, comment));
  }
}

module.exports = new CommentController();
