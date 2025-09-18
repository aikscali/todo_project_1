const express = require("express");
const userRoutes = require("./userRoutes");
const pswResetRoutes = require("./passwordResetRoutes");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

/**
 * Main application router.
 *
 * Aggregates and mounts sub-route modules for users, password resets, and tasks.
 *
 * @module routes/index
 */

/**
 * Mounts user-related routes.
 *
 * Base path: `/users`
 *
 * @see module:routes/userRoutes
 */
router.use("/users", userRoutes);

/**
 * Mounts password reset routes.
 *
 * Base path: `/password-reset`
 *
 * @see module:routes/passwordResetRoutes
 */
router.use("/password-reset", pswResetRoutes);

/**
 * Mounts task-related routes.
 *
 * Base path: `/tasks`
 *
 * @see module:routes/taskRoutes
 */
router.use("/tasks", taskRoutes);

module.exports = router;
