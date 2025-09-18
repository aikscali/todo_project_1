/**
 * Generic Data Access Object (DAO) class.
 * Provides basic CRUD operations and can be extended or reused
 * with any Mongoose model.
 */
class GlobalDAO {
  /**
   * Creates a new DAO instance for a given Mongoose model.
   *
   * @param {import("mongoose").Model} model - The Mongoose model to be used by the DAO.
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * Creates and saves a new document in the database.
   *
   * @async
   * @param {Object} data - The data to create the document with.
   * @returns {Promise<Object>} The created document.
   * @throws {Error} If there is an error while saving.
   *
   * @example
   * const user = await userDAO.create({ username: "john", email: "john@example.com" });
   */
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  /**
   * Reads a document by its ID.
   *
   * @async
   * @param {string} id - The ID of the document.
   * @returns {Promise<Object>} The found document.
   * @throws {Error} If the document is not found or an error occurs.
   *
   * @example
   * const user = await userDAO.read("60c72b2f9b1e8c0f8c8a4d12");
   */
  async read(id) {
    try {
      const document = await this.model.findById(id);
      if (!document) throw new Error("Document not found");
      return document;
    } catch (error) {
      throw new Error(`Error getting document by ID: ${error.message}`);
    }
  }

  /**
   * Updates a document by its ID.
   *
   * @async
   * @param {string} id - The ID of the document.
   * @param {Object} updateData - The fields to update.
   * @returns {Promise<Object>} The updated document.
   * @throws {Error} If the document is not found or an error occurs.
   *
   * @example
   * const updatedUser = await userDAO.update("60c72b2f9b1e8c0f8c8a4d12", { email: "new@example.com" });
   */
  async update(id, updateData) {
    try {
      const updatedDocument = await this.model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!updatedDocument) throw new Error("Document not found");
      return updatedDocument;
    } catch (error) {
      throw new Error(`Error updating document by ID: ${error.message}`);
    }
  }

  /**
   * Deletes a document by its ID.
   *
   * @async
   * @param {string} id - The ID of the document.
   * @returns {Promise<Object>} The deleted document.
   * @throws {Error} If the document is not found or an error occurs.
   *
   * @example
   * const deletedUser = await userDAO.delete("60c72b2f9b1e8c0f8c8a4d12");
   */
  async delete(id) {
    try {
      const deletedDocument = await this.model.findByIdAndDelete(id);
      if (!deletedDocument) throw new Error("Document not found");
      return deletedDocument;
    } catch (error) {
      throw new Error(`Error deleting document by ID: ${error.message}`);
    }
  }

  /**
   * Retrieves all documents that match a given filter.
   *
   * @async
   * @param {Object} [filter={}] - Mongoose filter object.
   * @returns {Promise<Array<Object>>} An array of documents.
   * @throws {Error} If an error occurs during retrieval.
   *
   * @example
   * const users = await userDAO.getAll({ active: true });
   */
  async getAll(filter = {}) {
    try {
      return await this.model.find(filter);
    } catch (error) {
      throw new Error(`Error getting documents: ${error.message}`);
    }
  }

  /**
   * Finds a single document by a query.
   *
   * @async
   * @param {Object} query - Mongoose query object.
   * @returns {Promise<Object|null>} The found document, or null if not found.
   * @throws {Error} If an error occurs during the query.
   *
   * @example
   * const user = await userDAO.findOne({ email: "john@example.com" });
   */
  async findOne(query) {
    try {
      return await this.model.findOne(query);
    } catch (error) {
      throw new Error(`Error in findOne: ${error.message}`);
    }
  }
}

module.exports = GlobalDAO;
