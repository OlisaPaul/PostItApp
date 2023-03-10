const { Post } = require("../model/post");

class PostService {
  //Create new post
  async createPost(post) {
    return await post.save();
  }

  async updatePostById(id, post) {
    return await Post.findByIdAndUpdate(
      id,
      {
        $set: post,
      },
      { new: true }
    );
  }
}

module.exports = new PostService();
