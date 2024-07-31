const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const path = require("path");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  let imagePath = null;

  if (req.file) {
    imagePath = path.normalize(req.file.path).replace(/\\/g, "/");
  }

  try {
    const user = await userModel.signup(email, password, imagePath);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
