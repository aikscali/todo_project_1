// /dao/taskDao.js
const Task = require("../models/Task");

/**
 * Inserta una nueva tarea en la base de datos
 * @param {Object} taskData - Datos de la tarea
 * @returns {Promise<Task>}
 */
const createTaskInDB = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

/**
 * Obtiene todas las tareas de la base de datos
 * @returns {Promise<Task[]>}
 */
const getAllTasksFromDB = async () => {
  return await Task.find();
};

module.exports = { createTaskInDB, getAllTasksFromDB };