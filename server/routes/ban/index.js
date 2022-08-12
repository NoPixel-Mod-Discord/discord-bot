const express = require("express");
const checkAPIKey = require("../../middleware");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/add", checkAPIKey, require("./add"));
router.post("/lookup", checkAPIKey, require("./lookup"));

module.exports = router;
