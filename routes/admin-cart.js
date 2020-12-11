const express = require("express");
const cartAdminController = require("../controllers/admin-cart");

const router = express.Router();

router.post("/cart", cartAdminController.addProductToCart);

router.delete("/cart", cartAdminController.deleteProductFromCart);

module.exports = router;
