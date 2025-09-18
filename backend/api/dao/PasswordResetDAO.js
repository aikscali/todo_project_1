const globalDao = require("./GlobalDao");
const modelo = require("../models/PasswordReset");

/**
 * Data Access Object (DAO) for the PasswordReset model.
 * Extends the generic GlobalDAO to provide CRUD operations
 * and custom queries for password reset functionality.
 *
 * @extends GlobalDAO
 */
class PasswordResetDAO extends globalDao {
  /**
   * Initializes the PasswordResetDAO with the PasswordReset model.
   */
  constructor() {
    super(modelo);
  }
}

module.exports = new PasswordResetDAO();
