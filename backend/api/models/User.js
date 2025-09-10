const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  name: { first: String, last: String },
  roles: { type: [String], default: ['user'] },
  isEmailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLoginAt: Date
});

module.exports = mongoose.model("User", UserSchema);