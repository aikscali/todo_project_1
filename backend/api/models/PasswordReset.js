const mongoose = require("mongoose");

/**
 * Schema definition for the PasswordReset model.
 *
 * Represents a password reset request, including a hashed token,
 * expiration date, usage status, and optional metadata such as IP and user agent.
 *
 * @typedef {Object} PasswordReset
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user who requested the reset (referenced from the User model).
 * @property {string} tokenHash - The hashed reset token (unique for each request).
 * @property {Date} createdAt - The date the reset request was created (defaults to current date).
 * @property {Date} expiresAt - The expiration date/time of the reset token.
 * @property {boolean} used - Indicates whether the reset token has already been used (default: false).
 * @property {string} [ip] - Optional IP address from which the reset was requested.
 * @property {string} [userAgent] - Optional user agent string of the client requesting the reset.
 */
const PasswordResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  ip: { type: String },
  userAgent: { type: String },
});

/**
 * PasswordReset model.
 *
 * Provides an interface for interacting with the `passwordresets` collection in MongoDB.
 *
 * @type {mongoose.Model<PasswordReset>}
 */
module.exports = mongoose.model("PasswordReset", PasswordResetSchema);
