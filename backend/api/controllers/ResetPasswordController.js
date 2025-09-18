const passwordResetDao = require("../dao/PasswordResetDAO");
const globalController = require("./GlobalController");
const UserDao = require("../dao/UserDAO");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../services/emailService");

/**
 * Controller for handling password reset operations
 * @class ResetPasswordController
 * @extends GlobalController
 * @description Handles password reset token generation, validation, and password changes
 */
class ResetPasswordController extends globalController {
  /**
   * Creates a new ResetPasswordController instance
   * @constructor
   */
  constructor() {
    super(passwordResetDao);
  }

  /**
   * Generates a password reset link and sends it via email
   * @async
   * @method generateLinkResetPassword
   * @param {Object} req - Express request object
   * @param {string} req.body.email - User's email address
   * @param {string} req.ip - Client IP address
   * @param {Object} req.headers - Request headers
   * @param {string} req.headers.user-agent - Client user agent
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with reset link or error message
   * @throws {Error} 404 if email not found, 400 for other errors
   */
  async generateLinkResetPassword(req, res) {
    try {
      const email = req.body.email;

      // Find the user by email
      const existingUser = await UserDao.findOne({
        $or: [{ email: req.body.email }],
      });

      // If the user does not exist, return 404
      if (!existingUser) {
        return res.status(404).json({ message: "Email not found" });
      }

      // If it exists, create a token (random string) and hash it with bcrypt (10 rounds)
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = await bcrypt.hash(rawToken, 10);

      // Calculate the expiration date (2 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 2);

      // Save the data in the database
      await this.dao.create({
        userId: existingUser._id,
        tokenHash,
        expiresAt,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });

      // Generate the link
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}&id=${existingUser._id}`;

      // Send the email with the link
      await sendEmail(
        existingUser.email,
        "Password Reset Request",
        `<p>Hi ${existingUser.username},</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 2 hours.</p>`
      );

      return res.status(201).json({
        message: "Password reset link generated",
        resetLink,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Changes user password using a valid reset token
   * @async
   * @method changePassword
   * @param {Object} req - Express request object
   * @param {string} req.body.token - Reset token from the URL
   * @param {string} req.body.userId - User ID from the URL
   * @param {string} req.body.newPassword - New password to set
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with success or error message
   * @throws {Error} 404 if token not found, 400 for invalid/expired token or other errors
   */
  async changePassword(req, res) {
    const token = req.body.token;
    const userId = req.body.userId;
    const newPassword = req.body.newPassword;

    // First, find the passwordReset document in the database by userId and used = false
    try {
      const passwordResetDoc = await this.dao.findOne({
        userId: userId,
        used: false,
      });
      if (!passwordResetDoc) {
        return res.status(404).json({ message: "Invalid or expired token" });
      }

      // Check if the token is expired
      if (passwordResetDoc.expiresAt < new Date()) {
        return res.status(400).json({ message: "Token has expired" });
      }

      // Compare the token from URL with the hashed token in the database
      const isTokenValid = await bcrypt.compare(
        token,
        passwordResetDoc.tokenHash
      );
      if (!isTokenValid) {
        return res.status(400).json({ message: "Invalid token" });
      }

      // If the token is valid, hash the new password with bcrypt (10 rounds)
      let hashPassword = newPassword;
      hashPassword = await bcrypt.hash(hashPassword, 10);

      // Update the user's password in the database
      await UserDao.update(userId, { passwordHash: hashPassword });

      // Mark the token as used
      await this.dao.update(passwordResetDoc._id, { used: true });

      return res
        .status(200)
        .json({ message: "Password has been changed successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ResetPasswordController();
