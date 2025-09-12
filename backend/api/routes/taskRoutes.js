// /routes/taskRoutes.js
const express = require("express");
const { createTask, getTasks } = require("../controllers/TaskController");

const router = express.Router();

/**
 * Rutas de tareas
 * POST /api/v1/tasks -> Crear una tarea
 * GET /api/v1/tasks -> Listar todas las tareas
 */
router.post("/", createTask);
router.get("/", getTasks);

module.exports = router;