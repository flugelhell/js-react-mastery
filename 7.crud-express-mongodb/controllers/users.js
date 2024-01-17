const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.getSignedJwtToken();
    res.status(200).json({
      message: "success",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, verify_token } = req.body;

    // untuk cek token aktif atw tidak, khusus jika memasukan verify token
    if (verify_token) {
      // console.log(verify_token);
      jwt.verify(verify_token, JWT_SECRET, (error, decoded) => {
        if (error) {
          // console.log("invalid");
          return res.status(401).json({ status: false, msg: "Token is not valid" });
        } else {
          // console.log("valid");
          return res.status(200).json({ status: true, msg: "Token valid" });
        }
      });
      return;
    }

    // Validate emil & password
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide an email and password",
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({
      message: "success",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
