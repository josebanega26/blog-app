const mongoose = require("mongoose");
const emailValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(emailValidator);

module.exports = mongoose.model("User", userSchema);
