const passwordResetDao = require("../dao/PasswordResetDAO");
const globalController = require("./GlobalController");
const UserDao = require("../dao/UserDAO");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendEmail } = require("../services/emailService");


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

            //send the email with the link 
            await sendEmail(
                existingUser.email,
                "Password Reset Request",
                `<p>Hi ${existingUser.username},</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 2 hours.</p>`
            );


            return res.status(201).json({
                message: "Password reset link generated",
                resetLink, 
            });


        }catch(error){
            return res.status(400).json({ message: error.message });
        }
    }



    async changePassword(req,res){
        const token = req.body.token;
        const userId = req.body.userId;
        const newPassword = req.body.newPassword;

        // first, find the passwordReset document in the database by userId and used = false
        try{
            const passwordResetDoc = await this.dao.findOne({ userId: userId, used: false });
            if (!passwordResetDoc){
                return res.status(404).json({ message: "Invalid or expired token" });
            }

            // check if the token is expired
            if (passwordResetDoc.expiresAt < new Date()){
                return res.status(400).json({ message: "Token has expired" });
            }

            // compare the token by url with the hashed token in the database
            const isTokenValid = await bcrypt.compare(token, passwordResetDoc.tokenHash);
            if (!isTokenValid){
                return res.status(400).json({ message: "Invalid token" });
            }

            // if the token is valid, hash the new password with bcrypt (10 rounds)
            let hashPassword = newPassword;
            hashPassword = await bcrypt.hash(hashPassword, 10);

            // update the user's password in the database
            await UserDao.update(userId, { passwordHash: hashPassword });

            // mark the token as used
            await this.dao.update(passwordResetDoc._id, { used: true });
            
            return res.status(200).json({ message: "Password has been changed successfully" });


        }catch(error){
            return res.status(400).json({ message: error.message });  
        }
    }


}


module.exports = new ResetPasswordController();
