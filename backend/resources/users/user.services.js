const User = require("./user.model");
const bcrypt = require("bcrypt");

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

  async LoginUser() {}
}

module.exports = UserService;
