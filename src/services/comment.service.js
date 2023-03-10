const { Comment } = require("../model/comment");

class CommentService {
  //Create new comment
  async createComment(comment) {
    return await comment.save();
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
