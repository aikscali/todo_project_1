const GlobalController = require("./GlobalController");
const UserDAO = require("../dao/UserDAO");
const bcrypt = require("bcrypt");

class UserController extends GlobalController {
  constructor() {
    super(UserDAO);
  }


  async createUser(req, res) {
    try{
      const existingUser = await this.dao.findOne({
          $or: [
              { email: req.body.email },
              { username: req.body.username }
          ]
      });

      if (existingUser) {
          return res.status(400).json({ message: "Email or username already in use" });
      }

      let hashPassword = req.body.password;
      hashPassword = await bcrypt.hash(hashPassword, 10);
      req.body.passwordHash = hashPassword;
      delete req.body.password;
      
      const user = await this.dao.create(req.body);
      return res.status(201).json(user);


    }catch(error){
      return res.status(400).json({ message: error.message });
    }
  }
}
module.exports = new UserController();