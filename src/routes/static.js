const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/api/about", staticController.about);

module.exports = router;
