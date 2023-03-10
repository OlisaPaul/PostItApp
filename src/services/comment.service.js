const { Comment } = require("../model/comment");

class CommentService {
  //Create new comment
  async createComment(comment) {
    return await comment.save();
  }

  async getCommentById(commentId) {
    return await Comment.findOne({ _id: commentId, isDeleted: undefined });
  }

  async getCommentByPostId(postId) {
    return await Comment.find({
      postId: postId,
      isDeleted: undefined,
    });
  }

  async getAllComments() {
    return await Comment.find({ isDeleted: undefined });
  }

  async updateCommentById(id, comment) {
    return await Comment.findByIdAndUpdate(
      id,
      {
        $set: comment,
      },
      { new: true }
    );
  }
}

module.exports = new CommentService();
