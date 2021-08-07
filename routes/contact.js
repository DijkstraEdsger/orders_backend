const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

router.post("/", contactController.createContact);

module.exports = router;
