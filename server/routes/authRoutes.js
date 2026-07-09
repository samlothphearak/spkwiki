const express = require("express");
const { register, login, me, upgrade, updateProfile } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/upgrade", authMiddleware, upgrade);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
