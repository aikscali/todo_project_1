const express = require("express");
const pswResetController = require("../controllers/ResetPasswordController");
const router = express.Router();


router.post("/", (req, res) => pswResetController.generateLinkResetPassword(req, res));
router.post("/updatePassword", (req, res) => pswResetController.changePassword(req, res));



module.exports = router;