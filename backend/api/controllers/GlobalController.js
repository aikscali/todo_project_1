/**
 * Global controller class providing CRUD operations for any entity
 * @class GlobalController
 * @description Base controller that can be extended for specific entities
 * @param {Object} dao - Data Access Object instance for database operations
 */
class GlobalController {
  /**
   * Creates a new GlobalController instance
   * @constructor
   * @param {Object} dao - Data Access Object instance
   */
  constructor(dao) {
    this.dao = dao;
  }

  /**
   * Creates a new item in the database
   * @async
   * @method create
   * @param {Object} req - Express request object
   * @param {Object} req.body - Data for the new item
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends created item with HTTP 201 status
   * @throws {Error} Sends HTTP 400 status with error message if creation fails
   */
  async create(req, res) {
    console.log("Creating item with data:", req.body);
    try {
      const item = await this.dao.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retrieves a specific item by ID
   * @async
   * @method read
   * @param {Object} req - Express request object
   * @param {string} req.params.id - ID of the item to retrieve
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends requested item with HTTP 200 status
   * @throws {Error} Sends HTTP 404 status if item is not found
   */
  async read(req, res) {
    try {
      const item = await this.dao.read(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Updates an existing item by ID
   * @async
   * @method update
   * @param {Object} req - Express request object
   * @param {string} req.params.id - ID of the item to update
   * @param {Object} req.body - Data to update the item with
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends updated item with HTTP 200 status
   * @throws {Error} Sends HTTP 400 status if update fails
   */
  async update(req, res) {
    try {
      const item = await this.dao.update(req.params.id, req.body);
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Deletes an item by ID
   * @async
   * @method delete
   * @param {Object} req - Express request object
   * @param {string} req.params.id - ID of the item to delete
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends deleted item with HTTP 200 status
   * @throws {Error} Sends HTTP 404 status if item is not found
   */
  async delete(req, res) {
    try {
      const item = await this.dao.delete(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Retrieves all items with optional query filters
   * @async
   * @method getAll
   * @param {Object} req - Express request object
   * @param {Object} [req.query] - Optional query parameters for filtering
   * @param {Object} res - Express response object
   * @returns {Promise<void>} Sends array of items with HTTP 200 status
   * @throws {Error} Sends HTTP 400 status if retrieval fails
   */
  async getAll(req, res) {
    try {
      const items = await this.dao.getAll(req.query);
      res.status(200).json(items);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = GlobalController;
