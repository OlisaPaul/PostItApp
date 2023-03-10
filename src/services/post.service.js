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

  async deletePost(id) {
    return await Post.findByIdAndRemove(id);
  }

  async softDeletePost(id) {
    const post = await Post.findById(id);

    post.isDeleted = true;

    return await post.save();
  }
}

module.exports = new PostService();
