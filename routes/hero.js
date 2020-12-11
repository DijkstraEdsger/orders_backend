const express = require("express");

const heroController = require("../controllers/hero");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/hero", heroController.getHeros);

router.get("/hero/:heroId", heroController.getHero);

router.post("/hero", heroController.createHero);

router.put("/hero/:heroId", heroController.updateHero);

router.delete("/hero/:heroId", heroController.deleteHero);

module.exports = router;
