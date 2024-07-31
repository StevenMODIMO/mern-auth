const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  imageURL: {
    type: String,
    default: "/covers/default",
  },
});

// Static methods
userSchema.statics.signup = async function (email, password, imageURL) {
  if (!email || !password) {
    throw Error("Empty fields detected.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Weak password");
  }

  const user = await this.findOne({ email });

  if (user) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await this.create({ email, password: hash, imageURL });
  return newUser;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
