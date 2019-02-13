const express = require("express");
const router = express.Router();
const validation = require("./validation");

const itemController = require("../controllers/itemController");

router.get("/items", itemController.index);
router.post("/item/create", validation.validateItems, itemController.create);
router.post("/item/:id/destroy", itemController.destroy);
router.get("/item/:id/edit", itemController.edit);
router.post(
  "/item/:id/update",
  validation.validateItems,
  itemController.update
);
router.post("/item/:id/buy", itemController.setPurchase);

module.exports = router;
