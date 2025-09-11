// /controllers/TaskController.js
const { createTaskInDB, getAllTasksFromDB } = require("../dao/taskDao");

/**
 * Crear una nueva tarea.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const createTask = async (req, res) => {
  try {
    const { title, detail, datetime } = req.body;

    if (!title || !datetime) {
      return res.status(400).json({ message: "Title and datetime are required" });
    }

    const dt = new Date(datetime);
    if (Number.isNaN(dt.getTime())) {
      return res.status(400).json({ message: "Invalid datetime format" });
    }

    const newTask = await createTaskInDB({
      title: title.trim(),
      detail: detail?.trim() || "",
      datetime: dt,
      status: "pending", // Sprint 1: todas empiezan pendientes
    });

    return res.status(201).json({ message: "Task created", task: newTask });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Listar todas las tareas.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksFromDB();
    return res.json(tasks);
  } catch (error) {
    console.error("getTasks error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, getTasks };
