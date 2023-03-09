const { User } = require("../model/user");
const bcrypt = require("bcrypt");

class UserService {
  //Create new user
  async createUser(user) {
    const salt = await bcrypt.genSalt(10);
    // for hashing the password that is saved the database for security reasons
    user.password = await bcrypt.hash(user.password, salt);

    return await user.save();
  }

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = new UserService();
