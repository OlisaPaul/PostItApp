const { User } = require("../model/user.model");
const { Post } = require("../model/post.model");
const postService = require("../services/post.service");
const userService = require("../services/user.service");
const constants = require("../common/constants.common");
const {
  errorMessage,
  successMessage,
  unAuthMessage,
} = require("../common/messages.common");
const { MESSAGES } = constants;

class PostController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  async newPost(req, res) {
    // Checks for duplicacy
    const user = await User.findById(req.body.userId);

    if (!user) return res.status(404).send(errorMessage(user, "user"));

    let post = new Post({
      post: req.body.post,
      userId: req.body.userId,
      dateCreated: new Date(), // set the dateCreted property to the time the post was created
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
      res.status(404).send(errorMessage(post, "post"));
    }
  }

  async getPostsByUserId(req, res) {
    const posts = await postService.getPostsByUserId(req.params.id);

    // checks for an empty array
    if (posts.length > 0) {
      res.send(successMessage(MESSAGES.FETCHED, posts));
    } else {
      res.status(404).send(errorMessage(posts, "post", "user"));
    }
  }

  async getPostByUserId(req, res) {
    const post = await postService.getPostByUserId(
      req.params.userId,
      req.params.postId
    );

    if (post.length > 0) {
      res.send(successMessage(MESSAGES.FETCHED, post));
    } else {
      res.status(404).send(errorMessage(post, "post"));
    }
  }

  //get all posts in the post collection/table
  async fetchAllPost(req, res) {
    const posts = await postService.getAllPosts();

    res.send(successMessage(MESSAGES.FETCHED, posts));
  }

  //Update/edit post data
  async updatePost(req, res) {
    let post = await postService.getPostById(req.params.id);

    if (!post) return res.status(404).send(errorMessage(post, "post"));

    if (req.user._id != post.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    post = await postService.updatePostById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, post));
  }

  async deletePost(req, res) {
    let post = await postService.getPostById(req.params.id);

    if (!post) return res.status(404).send(errorMessage(post, "post"));

    //makes sure a user can't delete a post created by another user.
    if (req.user._id != post.userId)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("delete")));

    post = await postService.softDeletePost(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, post));
  }
}

module.exports = new PostController();
