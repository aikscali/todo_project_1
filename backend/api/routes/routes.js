const express = require("express");
const userRoutes = require("./userRoutes");
const pswResetRoutes = require("./passwordResetRoutes")


const router = express.Router();
router.use("/users", userRoutes);
router.use("/password-reset", pswResetRoutes);


module.exports = router