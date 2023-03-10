const { Post } = require("../model/post");

class PostService {
  //Create new post
  async createPost(post) {
    return await post.save();
  }
}

module.exports = new PostService();
