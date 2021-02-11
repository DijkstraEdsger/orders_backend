const express = require("express");

const adminCategoryController = require("../controllers/admin-category");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/category", isAuth, adminCategoryController.createCategory);

router.put("/category/:categoryId", isAuth, adminCategoryController.updateCategory);

router.delete("/category/:categoryId", isAuth, adminCategoryController.deleteCategory);

module.exports = router;
