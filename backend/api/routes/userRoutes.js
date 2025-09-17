const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", (req, res) => UserController.getAll(req, res));
router.get("/:id", authMiddleware, (req, res) => UserController.read(req, res));
router.post("/", (req, res) => UserController.createUser(req, res));
router.put("/:id", (req, res) => UserController.update(req, res));
router.delete("/:id", (req, res) => UserController.delete(req, res));
router.post("/login", (req, res) => UserController.login(req, res));
router.post("/logout", authMiddleware, (req, res) => UserController.logout(req, res));
module.exports = router;