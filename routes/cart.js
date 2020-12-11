const express = require("express");

const cartController = require("../controllers/cart");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/cart", isAuth, cartController.getCart);

router.post("/cart", isAuth, cartController.addProductToCart);

router.delete("/cart", isAuth, cartController.deleteProductFromCart);

module.exports = router;
