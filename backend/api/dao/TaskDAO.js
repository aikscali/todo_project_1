const User = require("../models/Task");
const GlobalDao = require("./GlobalDao");

class TaskDao extends GlobalDao {
    constructor(){
        super(User);
    }
}

module.exports = new TaskDao();