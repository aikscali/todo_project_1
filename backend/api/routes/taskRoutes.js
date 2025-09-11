// /routes/taskRoutes.js
import { Router } from 'express';
import TaskController from '../controllers/tasks.controller.js';

const express = require("express");
const { createTask, getTasks } = require("../controllers/TaskController");

const router = express.Router();

/**
 * Rutas de tareas
 * POST /tasks -> Crear una tarea
 * GET /tasks -> Listar todas las tareas
 */
router.post("/tasks", createTask);
router.get("/tasks", getTasks);

module.exports = router;
