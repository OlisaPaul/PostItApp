const _ = require("lodash");
const { User } = require("../model/user");
const userService = require("../services/user.service");
const constants = require("../constants");
const { MESSAGES } = constants;
const { errorMessage, successMessage, unAuthMessage } = require("../messages");

class UserController {
  async getStatus(req, res) {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
  }

  //Create a new user
  async register(req, res) {
    // Checks if a user already exist by using the email id
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");

    user = new User(_.pick(req.body, ["name", "password", "email"]));

    user = await userService.createUser(user);

    // it creates a token which is sent as an header to the client
    const token = user.generateAuthToken();

    user = _.pick(user, ["_id", "name", "email"]);
    res
      .header("x-auth-header", token)
      // It determines what is sent back to the client
      .send(successMessage(MESSAGES.CREATED, user));
  }

  //Update/edit user data
  async updateUserProfile(req, res) {
    const user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).send(errorMessage(user));

    // makes sure the user can only update their account
    if (req.user._id !== user._id)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("update")));

    await userService.updateUserById(req.params.id, req.body);

    res.send(successMessage(MESSAGES.UPDATED, user));
  }

  //Delete user account entirely from the database
  async deleteUserAccount(req, res) {
    const user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).send(errorMessage(user));

    // makes sure the user can only delete their account
    if (req.user._id !== user._id)
      return res
        .status(401)
        .send(unAuthMessage(MESSAGES.UNAUTHORIZE("delete")));

    await userService.softDeleteUser(req.params.id);

    res.send(successMessage(MESSAGES.DELETED, user));
  }
}

module.exports = new UserController();
