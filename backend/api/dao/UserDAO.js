const User = require("../models/User");
const GlobalDao = require("./GlobalDao");

/**
 * Data Access Object (DAO) for the User model.
 * Extends the generic GlobalDAO to provide CRUD operations
 * and user-specific queries.
 *
 * @extends GlobalDAO
 */
class UserDAO extends GlobalDao {
  /**
   * Initializes the UserDAO with the User model.
   */
  constructor() {
    super(User);
  }
}

module.exports = new UserDAO();
