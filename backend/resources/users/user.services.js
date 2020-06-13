const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../../config");
const { secret } = config;
class UserService {
  constructor() {}

  async createUser(email, password) {
    let user;
    try {
      const passwordEncrypted = await bcrypt.hash(password, 10);
      user = new User({ email: email, password: passwordEncrypted });
    } catch (error) {
      console.log("error", error);
    }
    return new Promise(async (resolve, reject) => {
      try {
        const result = await user.save();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  async loginUser(email, password) {
    let user = await User.findOne({ email });
    if (!user) {
      return {
        message: "User don't exist",
        status: 404,
      };
    }
    try {
      let matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return {
          message: "Auth Failed, Password don't match",
          status: 401,
        };
      }
      //Token last 1 hr
      const jwtFirm = { email: user.email, id: user._id };
      const token = jwt.sign(jwtFirm, secret, { expiresIn: "1h" });

      return {
        status: 200,
        token,
        expiresIn: 3600,
        userId: user._id,
      };
    } catch (error) {
      return {
        message: "Auth Failed",
        status: 401,
      };
    }
  }
}

module.exports = UserService;
