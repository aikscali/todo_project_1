const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Controller class for handling user-related operations.
 * Extends the base GlobalController with UserDAO as the data access object.
 */
class UserController extends GlobalController {
  /**
   * Initializes the UserController with the UserDAO.
   */
  constructor() {
    super(UserDAO);
  }

  /**
   * Creates a new user.
   *
   * @async
   * @function createUser
   * @param {import("express").Request} req - Express request object containing user data (email, username, password, etc.).
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<import("express").Response>} Response with the created user's ID or an error message.
   *
   * @example
   * POST /api/users
   * {
   *   "email": "user@example.com",
   *   "username": "newUser",
   *   "password": "mypassword"
   * }
   */
  async createUser(req, res) {
    try {
      const existingUser = await this.dao.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (existingUser) {
        return res
          .status(409)
          .json({ message: "Email or username already in use" });
      }

      let hashPassword = req.body.password;
      hashPassword = await bcrypt.hash(hashPassword, 10);
      req.body.passwordHash = hashPassword;
      delete req.body.password;

      const user = await this.dao.create(req.body);
      return res.status(201).json({ id: user._id });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Authenticates a user and generates a JWT token if credentials are valid.
   *
   * @async
   * @function login
   * @param {import("express").Request} req - Express request object containing email and password.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<import("express").Response>} Response with a JWT token cookie and user ID, or an error message.
   *
   * @example
   * POST /api/users/login
   * {
   *   "email": "user@example.com",
   *   "password": "mypassword"
   * }
   */
  async login(req, res) {
    try {
      const email = req.body.email.trim().toLowerCase();
      const password = req.body.password;

      const user = await this.dao.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Incorrect email or password.",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          name: user.name,
          roles: user.roles,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );

      

      function sameSiteValue() {
        if (process.env.NODE_ENV === 'production'){
          return "None"
        }else{
          return "Lax"
        }
      }

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, 
          sameSite: "Lax",
          path: "/",
          maxAge: 1000 * 60 * 60 * 24,
        })
        .status(200)
        .json({ id: user._id });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Initiates a password reset process for a user.
   *
   * @async
   * @function resetPassword
   * @param {import("express").Request} req - Express request object containing the user's email.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<import("express").Response>} Response confirming reset initiation or error message.
   *
   * @example
   * POST /api/users/reset-password
   * {
   *   "email": "user@example.com"
   * }
   */
  async resetPassword(req, res) {
    try {
      const email = req.body.email;

      const existingUser = await this.dao.findOne({
        $or: [{ email: email }],
      });

      if (!existingUser) {
        return res
          .status(404)
          .json({ message: "No user found with this email" });
      }

      // TODO: Implement sending of reset token/email.
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Logs out the currently authenticated user by clearing the token cookie.
   *
   * @async
   * @function logout
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @returns {Promise<import("express").Response>} Response confirming successful logout.
   *
   * @example
   * POST /api/users/logout
   */
  async logout(req, res) {

    const sameSiteValue = () => {
      if (process.env.NODE_ENV === 'production'){
        return "None"
      }else{
        return "Strict"
      }
    }


    try {
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        //sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        sameSite: sameSiteValue(),
        path: "/",
        expires: new Date(0),
      };

      

      return res
        .cookie("token", "", cookieOptions)
        .status(200)
        .json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
 
  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const { email, name } = req.body;

      const updated = await this.dao.updateProfile(userId, { email, name });

      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new UserController(); 
