const User = require("../models/Task");
const GlobalDao = require("./GlobalDao");

/**
 * Data Access Object (DAO) for the Task model.
 * Extends the generic GlobalDAO to provide CRUD operations
 * and custom queries for tasks.
 *
 * @extends GlobalDAO
 */
class TaskDao extends GlobalDao {
  /**
   * Initializes the TaskDao with the Task model.
   */
  constructor() {
    super(User);
  }
}

module.exports = new TaskDao();
