const express = require("express");
const router = express.Router();
const urlControllers = require("../controllers/url.controller.js");
// const userController = require("../controllers/user.controller.js");

router.post("/",urlControllers.postUrl);
router.get("/",urlControllers.getUrl);
router.get("/:shortId",urlControllers.moveToOgUrl);


module.exports = router;
