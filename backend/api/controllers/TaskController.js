const GlobalController = require("./GlobalController");
const TaskDao = require("../dao/TaskDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class TaskController extends GlobalController {
  constructor() {
    super(TaskDao);
  }


  async createTask(req, res) {
    
    try {
      //first we get the data from the body
      const { title, description, status, priority, dueDate, startDate, labels } = req.body;
      const ownerId = req.user.id;

      // create the task object and save it in the database
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
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }


  async getTasks(req, res) {
    try {

      //get the user id from the token
      const ownerId = req.user.id; 

      //get all tasks that belong to the user
      const tasks = await TaskDao.getAll({ ownerId });
      res.status(200).json(tasks);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}
module.exports = new TaskController();