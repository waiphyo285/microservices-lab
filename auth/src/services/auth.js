const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(args) {
    const { email, password } = args;

    const existingUser = await this.repository.FindUser({ email });

    if (existingUser) {
      const validPassword = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );

      if (validPassword) {
        const token = await GenerateSignature({
          _id: existingUser._id,
          email: existingUser.email,
        });

        return FormateData({ id: existingUser._id, token });
      }
    }

    return FormateData(null);
  }

  async SignUp(args) {
    const { email, password, phone } = args;

    const salt = await GenerateSalt();

    const userPassword = await GeneratePassword(password, salt);

    const newUser = await this.repository.CreateUser({
      email,
      password: userPassword,
      phone,
      salt,
    });

    const token = await GenerateSignature({
      _id: newUser._id,
      email: newUser.email,
    });

    return FormateData({ id: newUser._id, token });
  }

  async GetProfile(id) {
    const existingUser = await this.repository.FindUserById({ id });
    return FormateData(existingUser);
  }
}

module.exports = UserService;
