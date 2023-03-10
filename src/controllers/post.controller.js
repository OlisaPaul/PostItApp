const { User } = require("../model/user");
const { Post } = require("../model/post");
const postService = require("../services/post.service");
const constants = require("../constants");
const { errorMessage, successMessage, unAuthMessage } = require("../messages");
const { MESSAGES } = constants;

class PostController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  async newPost(req, res) {
    // Checks for duplicacy
    const user = await User.findById(req.body.userId);

    if (!user) res.status(404).send(errorMessage(user));

    let post = new Post({
      post: req.body.post,
      userId: req.body.userId,
    });

    post = await post.save();

    // Sends the created post as response
    res.send(successMessage(MESSAGES.CREATED, post));
  }

  //get post from the database, using their email
  async getPostById(req, res) {
    const post = await postService.getPostById(req.params.id);

    if (post) {
      res.send(successMessage(MESSAGES.FETCHED, post));
    } else {
      res.status(404).send(errorMessage(post));
    }
  }

  //get all posts in the post collection/table
  async fetchAllPost(req, res) {
    const posts = await postService.getAllPosts();

    if (posts) {
      res.send(successMessage(MESSAGES.FETCHED, posts));
    } else {
      res.status(404).send(errorMessage(posts));
    }
  }

  //Update/edit post data
  async updatePost(req, res) {
    const post = await postService.getPostById(req.params.id);

    if (!post) return res.status(404).send(errorMessage(post));

    if (req.user._id != post.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    await postService.updatePostById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, post));
  }

  async deletePost(req, res) {
    let post = await postService.getPostById(req.params.id);

    if (!post) return res.status(404).send(errorMessage(post));

    if (req.user._id != post.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("delete")));

    post = await postService.softDeletePost(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, post));
  }
}

module.exports = new PostController();
