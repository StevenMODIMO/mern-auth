const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// static methods

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Empty fields detected");
  }

  if (!isEmail(email)) {
    throw Error("Invalid email address");
  }

  if (!isStrongPassword(password)) {
    throw Error(
      "Password must contain special character, small and capital lettersF"
    );
  }

  const user = await this.findOne({ email });

  if (user) {
    throw Error("Email already in use");
  }

  const SALT = await bcrypt.genSalt(10);
  const HASH = await bcrypt.hash(password, SALT);

  const newUser = await this.create({ email, password: HASH });

  return newUser;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Empty fields detected");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
