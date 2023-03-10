const { Comment } = require("../model/comment");

class CommentService {
  //Create new comment
  async createComment(comment) {
    return await comment.save();
  }
}

module.exports = new CommentService();
