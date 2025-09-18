const GlobalController = require("./GlobalController");
const TaskDao = require("../dao/TaskDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Controller for handling task-related operations
 * @class TaskController
 * @extends GlobalController
 * @description Handles task creation, retrieval, and updates for authenticated users
 */
class TaskController extends GlobalController {
  /**
   * Creates a new TaskController instance
   * @constructor
   */
  constructor() {
    super(TaskDao);
  }

  /**
   * Creates a new task for the authenticated user
   * @async
   * @method createTask
   * @param {Object} req - Express request object
   * @param {Object} req.user - Authenticated user object from middleware
   * @param {string} req.user.id - User ID from JWT token
   * @param {Object} req.body - Task data
   * @param {string} req.body.title - Task title
   * @param {string} req.body.description - Task description
   * @param {string} req.body.status - Task status
   * @param {string} req.body.priority - Task priority
   * @param {Date} req.body.dueDate - Task due date
   * @param {Date} req.body.startDate - Task start date
   * @param {Array} req.body.labels - Task labels array
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with created task or error message
   * @throws {Error} 500 if server error occurs during task creation
   */
  async createTask(req, res) {
    try {
      // First we get the data from the body
      const {
        title,
        description,
        status,
        priority,
        dueDate,
        startDate,
        labels,
      } = req.body;
      const ownerId = req.user.id;

      // Create the task object and save it in the database
      const newTask = await TaskDao.create({
        ownerId,
        title,
        description,
        status,
        priority,
        dueDate,
        startDate,
        labels,
      });

      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Retrieves all tasks belonging to the authenticated user
   * @async
   * @method getTasks
   * @param {Object} req - Express request object
   * @param {Object} req.user - Authenticated user object from middleware
   * @param {string} req.user.id - User ID from JWT token
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with array of tasks or error message
   * @throws {Error} 500 if server error occurs during task retrieval
   */
  async getTasks(req, res) {
    try {
      // Get the user id from the token
      const ownerId = req.user.id;

      // Get all tasks that belong to the user
      const tasks = await TaskDao.getAll({ ownerId });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Updates an existing task belonging to the authenticated user
   * @async
   * @method update
   * @param {Object} req - Express request object
   * @param {Object} req.user - Authenticated user object from middleware
   * @param {string} req.user.id - User ID from JWT token
   * @param {Object} req.params - Route parameters
   * @param {string} req.params.id - Task ID to update
   * @param {Object} req.body - Task data to update
   * @param {Object} res - Express response object
   * @returns {Promise<Object>} JSON response with updated task or error message
   * @throws {Error} 404 if task not found or doesn't belong to user
   * @throws {Error} 400 if validation fails or other client error
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const ownerId = req.user.id;

      // Verify task exists and belongs to user
      const existingTask = await TaskDao.findOne({ _id: id, ownerId });
      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      const updatedTask = await TaskDao.update(id, updates);
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
