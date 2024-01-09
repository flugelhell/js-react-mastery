const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomize = require("randomatic");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 3,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
// Set Expired
// ('2 days')  // 172800000
// ('1d')   // 86400000
// ('10h')  // 36000000
// ('2.5 hrs') // 9000000
// ('2h')      // 7200000
// ('1m')      // 60000
// ('5s')      // 5000
// ('1y')      // 31557600000
// ('100')     // 100
// ('-3 days') // -259200000
// ('-1h')     // -3600000
// ('-200')    // -200
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
