const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

/**
 * Routes for handling user operations such as registration, login, and account management.
 *
 * @module routes/userRoutes
 */

/**
 * GET /
 *
 * Retrieves all users.
 *
 * @name GetAllUsers
 * @route {GET} /
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with an array of users or an error message.
 */
router.get("/", (req, res) => UserController.getAll(req, res));

/**
 * GET /:id
 *
 * Retrieves a user by ID.
 *
 * @name GetUserById
 * @route {GET} /:id
 * @param {import("express").Request} req - Express request object with user ID in params.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with the user object or an error message.
 */
router.get("/:id", (req, res) => UserController.read(req, res));

/**
 * POST /
 *
 * Creates a new user account.
 *
 * @name CreateUser
 * @route {POST} /
 * @param {import("express").Request} req - Express request object containing user data (email, username, password, etc.).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with the created user's ID or an error message.
 */
router.post("/", (req, res) => UserController.createUser(req, res));

/**
 * PUT /:id
 *
 * Updates an existing user account by ID.
 *
 * @name UpdateUser
 * @route {PUT} /:id
 * @param {import("express").Request} req - Express request object containing updated user data.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with the updated user or an error message.
 */
router.put("/:id", (req, res) => UserController.update(req, res));

/**
 * DELETE /:id
 *
 * Deletes a user account by ID.
 *
 * @name DeleteUser
 * @route {DELETE} /:id
 * @param {import("express").Request} req - Express request object with user ID in params.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response confirming deletion or an error message.
 */
router.delete("/:id", (req, res) => UserController.delete(req, res));

/**
 * POST /login
 *
 * Authenticates a user and returns a JWT token if credentials are valid.
 *
 * @name LoginUser
 * @route {POST} /login
 * @param {import("express").Request} req - Express request object containing email and password.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with JWT token cookie and user ID or an error message.
 */
router.post("/login", (req, res) => UserController.login(req, res));

/**
 * POST /logout
 *
 * Logs out the authenticated user by clearing the JWT token cookie.
 *
 * @name LogoutUser
 * @route {POST} /logout
 * @middleware authMiddleware
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response confirming successful logout or an error message.
 */
router.post("/logout", authMiddleware, (req, res) =>
  UserController.logout(req, res)
);

module.exports = router;
