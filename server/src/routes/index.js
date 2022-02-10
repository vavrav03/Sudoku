const express = require("express");
const path = require("path");

const auth = require("./auth");
const user = require("./user");
const games = require("./games");

const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/games", games);

module.exports = router;
