const express = require("express");
const userRoutes = require("./userRoutes");
const pswResetRoutes = require("./passwordResetRoutes");
const taskRoutes = require("./taskRoutes"); 

const router = express.Router();

router.use("/users", userRoutes);
router.use("/password-reset", pswResetRoutes);
router.use("/tasks", taskRoutes); 

module.exports = router;