const express = require("express");

const orderController = require("../controllers/order");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/order", isAuth, orderController.createOrder);

router.get("/order", isAuth, orderController.getOrders);

module.exports = router;
