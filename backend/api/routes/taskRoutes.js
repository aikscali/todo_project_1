const express = require("express");
const TaskController = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Routes for handling task operations.
 *
 * All routes are protected by the authentication middleware.
 *
 * @module routes/taskRoutes
 */

/**
 * POST /
 *
 * Creates a new task for the authenticated user.
 *
 * @name CreateTask
 * @route {POST} /
 * @middleware authMiddleware
 * @param {import("express").Request} req - Express request object containing task data (title, description, etc.).
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with the created task or an error message.
 *
 * @example
 * // Request body
 * {
 *   "title": "Finish documentation",
 *   "description": "Write JSDoc for task routes",
 *   "priority": "high"
 * }
 */
router.post("/", authMiddleware, (req, res) => TaskController.createTask(req, res));


/**
 * GET /
 *
 * Retrieves all tasks belonging to the authenticated user.
 *
 * @name GetTasks
 * @route {GET} /
 * @middleware authMiddleware
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with an array of tasks or an error message.
 *
 * @example
 * // Example response
 * [
 *   { "id": "123", "title": "Task 1", "status": "todo" },
 *   { "id": "124", "title": "Task 2", "status": "done" }
 * ]
 */
router.get("/", authMiddleware, (req, res) => TaskController.getTasks(req, res));

/**
 * PUT /:id
 *
 * Updates a specific task by ID for the authenticated user.
 *
 * @name UpdateTask
 * @route {PUT} /:id
 * @middleware authMiddleware
 * @param {import("express").Request} req - Express request object containing updated task data.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<import("express").Response>} Response with the updated task or an error message.
 *
 * @example
 * // Request body
 * {
 *   "status": "done",
 *   "completedAt": "2025-09-18T12:00:00Z"
 * }
 */
router.put("/:id", authMiddleware, (req, res) => TaskController.update(req, res));





router.delete("/:id", authMiddleware, (req, res) => TaskController.delete(req, res));






module.exports = router;
