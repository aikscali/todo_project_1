const mongoose = require("mongoose");

/**
 * Schema definition for the User model.
 *
 * Represents an application user, including authentication data,
 * personal details, and account metadata.
 *
 * @typedef {Object} User
 * @property {string} email - The user's email address (unique, required, stored in lowercase).
 * @property {string} [username] - Optional unique username for the user.
 * @property {string} passwordHash - The hashed password (required).
 * @property {{ first: string, last: string }} [name] - Optional user's first and last name.
 * @property {number} [age] - Optional user's age (must be at least 13).
 * @property {string[]} roles - Array of user roles (default: ["user"]).
 * @property {boolean} isEmailVerified - Whether the user's email has been verified (default: false).
 * @property {Date} createdAt - The date when the user account was created (default: current date).
 * @property {Date} updatedAt - The date when the user account was last updated (default: current date).
 * @property {Date} [lastLoginAt] - The date of the user's last login.
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  name: { first: String, last: String },
  age: { type: Number, min: 13 },
  roles: { type: [String], default: ["user"] },
  isEmailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLoginAt: Date,
});

/**
 * User model.
 *
 * Provides an interface for interacting with the `users` collection in MongoDB.
 *
 * @type {mongoose.Model<User>}
 */
module.exports = mongoose.model("User", UserSchema);
