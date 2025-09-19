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

  async updateProfile(userId, { email, name }) {
    try {
      // Verificar que el email no esté usado por otro usuario
      if (email) {
        const existingUser = await this.model.findOne({
          email: email.toLowerCase(),
          _id: { $ne: userId },
        });

        if (existingUser) {
          throw new Error("El correo electrónico ya está en uso por otro usuario");
        }
      }

      // Actualizar solo los campos permitidos
      const updatedUser = await this.model.findByIdAndUpdate(
        userId,
        {
          ...(email && { email: email.toLowerCase() }),
          ...(name && { name }),
          updatedAt: new Date(),
        },
        { new: true } // retorna el documento actualizado
      );

      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar perfil: ${error.message}`);
    }
  }
}

module.exports = new UserDAO();
