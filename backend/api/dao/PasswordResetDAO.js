const globalDao = require("./GlobalDao")
const modelo = require("../models/PasswordReset")


class PasswordResetDAO extends globalDao {
    constructor() {
        super(modelo);
    }

}


module.exports = new PasswordResetDAO();

