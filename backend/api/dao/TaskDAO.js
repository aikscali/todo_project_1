// /dao/taskDao.js
import Task from "../models/Task.js";

/**
 * Inserta una nueva tarea en la base de datos
 * @param {Object} taskData - Datos de la tarea
 * @returns {Promise<Task>}
 */
export const createTaskInDB = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

/**
 * Obtiene todas las tareas de la base de datos
 * @returns {Promise<Task[]>}
 */
export const getAllTasksFromDB = async () => {
  return await Task.find();
};
