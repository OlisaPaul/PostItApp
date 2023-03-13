const { Post } = require("../model/post.model");

class PostService {
  //Create new post
  async createPost(post) {
    return await post.save();
  }

  async getPostById(postId) {
    return await Post.findOne({ _id: postId, isDeleted: undefined });
  }

  async getAllPosts() {
    return await Post.find({ isDeleted: undefined }).sort("-dateCreated");
  }

  async getPostsByUserId(userId) {
    return await Post.find({
      userId: userId,
      isDeleted: undefined,
    });
  }

  async getPostsByUsername(username) {
    return await Post.find({
      username,
      isDeleted: undefined,
    });
  }

  async getPostByUserId(userId, postId) {
    return await Post.find({
      _id: postId,
      userId: userId,
      isDeleted: undefined,
    });
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

    // this flags the isDeleted property of the comment to true, telling all get methods not to return it user
    post.isDeleted = true;

    return await post.save();
  }
}

module.exports = new PostService();
