const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

router.get("/items", itemController.index);
router.post("/item/create", itemController.create);
router.delete("/item/:id/destroy", itemController.destroy);

module.exports = router;
