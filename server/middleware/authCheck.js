const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, "sdad32r34wer32eds");
    req.user = await User.findOne({ _id: id }).select("id");
    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
};

module.exports = authCheck;
