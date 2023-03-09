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
}

module.exports = new UserController();
