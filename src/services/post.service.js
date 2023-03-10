const { Post } = require("../model/post");

class PostService {
  //Create new post
  async createPost(post) {
    return await post.save();
  }

  async getPostById(postId) {
    return await Post.findOne({ _id: postId, isDeleted: undefined });
  }

  async getAllPosts() {
    return await Post.find({ isDeleted: undefined });
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
