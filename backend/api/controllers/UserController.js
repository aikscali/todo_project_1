const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }


  async createUser(req, res) {
    try{

      // Check if the email or username already exists, with the function findOne of the dao
      const existingUser = await this.dao.findOne({
          $or: [
              { email: req.body.email },
              { username: req.body.username }
          ]
      });

      //if it exists, return 409 conflict, wuth the corresponding message
      if (existingUser) {
          return res.status(409).json({ message: "Email or username already in use" });
      }

      // if not, hash the password with bcrypt (10 rounds)
      let hashPassword = req.body.password;
      hashPassword = await bcrypt.hash(hashPassword, 10);
      req.body.passwordHash = hashPassword;
      delete req.body.password;
      
      // create the user with the dao create function
      const user = await this.dao.create(req.body);
      return res.status(201).json({
          id: user._id
      });


    }catch(error){
      return res.status(400).json({ message: error.message });
    }
  }


  async login(req,res){
    try{
      // get the usernme and password from the request body
      const email = req.body.email.trim().toLowerCase();

      const password = req.body.password;
      
      //verify if the user exists (filter by username)
      const user = await this.dao.findOne({ email: email });


      if (!user) {
          return res.status(404).json({
              message: "Usuario no encontrado."
          })
      }

      // if the user exists, verify the password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
          return res.status(401).json({
              message: "Contraseña o email incorrectos."
          });
      }

      // if the password is valid, create a JWT token
      // payload: id, username, roles
      // sign with secret and expiration from .env
      // return the token in the response
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          roles: user.roles,
          email: user.email
        },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES }
      );

      // return the token and the user id if login is successful
      return res.status(200).json({
          token,
          id: user._id,
      });
    }catch(error){
      return res.status(400).json({ message: error.message });
    }
  }


  async resetPassword(req, res) {
    try {
      const email = req.body.email;

      // verify if this user with this email exists
      const existingUser = await this.dao.findOne({
          $or: [
              { email: req.body.email }
          ]
      });

      if (!existingUser) {
          return res.status(404).json({ message: "No user found with this email" });
      }

      
    }catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

}
module.exports = new UserController();