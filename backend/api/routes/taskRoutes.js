// /routes/taskRoutes.js
const express = require("express");
const TaskController = require("../controllers/TaskController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/", authMiddleware, (req, res) => TaskController.createTask(req, res));
router.get("/", authMiddleware, (req, res) => TaskController.getTasks(req, res));


module.exports = router;