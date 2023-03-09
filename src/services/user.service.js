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

  async getUserById(userId) {
    //Makes email search filter case insensitive and a lot more broad(even if search parameter isnt completely correct.)
    return await User.findOne({ _id: userId, isDeleted: undefined });
  }

  async getAllUsers() {
    return await User.find({ isDeleted: undefined });
  }

  async updateUserById(id, user) {
    //makes email case insensitive

    return await User.findByIdAndUpdate(
      id,
      {
        $set: user,
      },
      { new: true }
    );
  }

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
  }
}

module.exports = new UserService();
