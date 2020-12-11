const express = require("express");

const imageController = require("../controllers/admin-image");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/image", isAuth, imageController.getImages);

// router.get("/product/:productId", isAuth, productController.getProduct);

router.post("/image", imageController.createImage);

// router.put("/product/:productId", isAuth, productController.updateProduct);

// router.delete("/product/:productId", isAuth, productController.deleteProduct);

module.exports = router;
