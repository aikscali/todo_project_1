const mongoose = require("mongoose");


const PasswordResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  ip: { type: String },
  userAgent: { type: String }
});

module.exports = mongoose.model("PasswordReset", PasswordResetSchema);