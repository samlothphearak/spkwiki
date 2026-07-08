const express = require("express");
const { createArticle } = require("../controller/wikiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createArticle);

module.exports = router;
