const { Comment } = require("../model/comment.model");
const commentService = require("../services/comment.service");
const userService = require("../services/user.service");
const postService = require("../services/post.service");
const constants = require("../common/constants.common");
const { MESSAGES } = constants;
const {
  errorMessage,
  successMessage,
  unAuthMessage,
} = require("../common/messages.common");

class CommentController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }
  //Create a new comment

  async createComment(req, res) {
    const user = await userService.getUserById(req.body.userId);

    if (!user) res.status(404).send(errorMessage(user, "user"));

    const post = await postService.getPostById(req.body.postId);

    if (!post) res.status(404).send(errorMessage(post, "post"));

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

    res.send(successMessage(MESSAGES.FETCHED, comments));
  }

  //get comment from the database, using their email
  async getCommentById(req, res) {
    const comment = await commentService.getCommentById(req.params.id);

    if (comment) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment, "comment"));
    }
  }

  async getCommentByPostId(req, res) {
    const comment = await commentService.getCommentByPostId(req.params.id);

    if (comment) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment, "comment", "post"));
    }
  }

  async getCommentsOnPostByUserId(req, res) {
    const commentsOnPost = await commentService.getCommentByPostId(
      req.params.postId
    );

    if (commentsOnPost.length <= 0)
      return res
        .status(404)
        .send(errorMessage(commentsOnPost, "comment", "post"));

    const comment = await commentService.getCommentsOnPostByUserId(
      req.params.userId,
      req.params.postId
    );

    if (comment && comment.length > 0) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment, "comment"));
    }
  }

  async getSingleCommentOnPostByUserId(req, res) {
    const commentsOnPost = await commentService.getCommentByPostId(
      req.params.postId
    );

    if (commentsOnPost.length <= 0)
      return res
        .status(404)
        .send(errorMessage(commentsOnPost, "comment", "post"));

    const comment = await commentService.getSingleCommentOnPostByUserId(
      req.params.userId,
      req.params.postId,
      req.params.commentId
    );

    if (comment && comment.length > 0) {
      res.send(successMessage(MESSAGES.FETCHED, comment));
    } else {
      res.status(404).send(errorMessage(comment, "comment"));
    }
  }

  //Update/edit comment data
  async updateComment(req, res) {
    let comment = await commentService.getCommentById(req.params.id);

    if (!comment) return res.status(404).send(errorMessage(comment, "comment"));

    if (req.user._id != comment.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    comment = await commentService.updateCommentById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, comment));
  }

  //Delete comment account entirely from the database
  async deleteComment(req, res) {
    let comment = await commentService.getCommentById(req.params.id);

    if (!comment) return res.status(404).send(errorMessage(comment, "comment"));

    if (req.user._id != comment.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("delete")));

    await commentService.softDeleteComment(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, comment));
  }
}

module.exports = new CommentController();
