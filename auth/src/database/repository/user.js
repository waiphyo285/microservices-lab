const { UserModel } = require("../models");

class UserRepository {
  async CreateUser({ email, password, phone, salt }) {
    const newUser = new UserModel({
      email,
      phone,
      password,
      salt,
    });

    return await newUser.save();
  }

  async FindUser({ email }) {
    return await UserModel.findOne({ email: email });
  }

  async FindUserById({ id }) {
    return await UserModel.findById(id);
  }
}

module.exports = UserRepository;
