const express = require("express");
const pswResetController = require("../controllers/ResetPasswordController");
const router = express.Router();

/**
 * Routes for handling password reset operations.
 *
 * @module routes/resetPasswordRoutes
 */

/**
 * POST /
 *
 * Generates a password reset link for a given user email.
 *
 * @name GenerateLinkResetPassword
 * @route {POST} /
 * @param {import("express").Request} req - Express request object containing the user email.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with confirmation or error message.
 *
 * @example
 * // Example request body
 * {
 *   "email": "user@example.com"
 * }
 */
router.post("/", (req, res) =>
  pswResetController.generateLinkResetPassword(req, res)
);

/**
 * POST /updatePassword
 *
 * Updates the user's password using a valid reset token.
 *
 * @name ChangePassword
 * @route {POST} /updatePassword
 * @param {import("express").Request} req - Express request object containing reset token and new password.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response confirming password update or error message.
 *
 * @example
 * // Example request body
 * {
 *   "token": "resetTokenFromEmail",
 *   "newPassword": "newSecurePassword123"
 * }
 */
router.post("/updatePassword", (req, res) =>
  pswResetController.changePassword(req, res)
);

module.exports = router;
