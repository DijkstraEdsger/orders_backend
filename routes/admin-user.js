const express = require("express");

const userController = require("../controllers/admin-user");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/users", isAuth, userController.getUsers);

router.get("/users/:userId", isAuth, userController.getUser);

router.post("/users", isAuth, userController.createUser);

router.put("/users/:userId", isAuth, userController.updateUser);

router.delete("/users/:userId", isAuth, userController.deleteUser);

module.exports = router;
