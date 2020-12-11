const express = require("express");
const adminOrderController = require("../controllers/admin-order");

const router = express.Router();

router.post("/order", adminOrderController.createOrder);

router.get("/orders", adminOrderController.getOrdersByUser);

module.exports = router;
