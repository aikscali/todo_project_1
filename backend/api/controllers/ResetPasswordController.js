const passwordResetDao = require("../dao/PasswordResetDAO");
const globalController = require("./GlobalController");
const UserDao = require("../dao/UserDAO");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


class ResetPasswordController extends globalController {
    constructor() {
        super(passwordResetDao);
    }


    // generate a link with a token to reset the password
    async generateLinkResetPassword(req, res){
        try{
            
            

            const email = req.body.email;

            //find the user by email
            const existingUser = await UserDao.findOne({
                $or: [
                    { email: req.body.email }
                ]
            });

            // if the user does not exist, return 404
            if (!existingUser) {
                return res.status(404).json({ message: "Email not found" });
            }

            //if it exists, create a token (random string) and hash it with bcrypt (10 rounds)
            const rawToken = crypto.randomBytes(32).toString("hex");
            const tokenHash = await bcrypt.hash(rawToken, 10); 

            // calculate the expiration date (2 hour from now)
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 2);

            // save the data in the database
            await this.dao.create({
                userId: existingUser._id,
                tokenHash,
                expiresAt,
                ip: req.ip,
                userAgent: req.headers["user-agent"],
            });

            //generate the link
            const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}&id=${existingUser._id}`;

            return res.status(201).json({
                message: "Password reset link generated",
                resetLink, // ⚠️ en prod no lo devuelvas, solo por testing
            });


        }catch(error){
            return res.status(400).json({ message: error.message });
        }
    }


}


module.exports = new ResetPasswordController();
