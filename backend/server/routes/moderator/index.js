const express = require("express");
const checkAPIKey = require("../../middleware");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/add", checkAPIKey, require("./add"));
router.post("/get-id", checkAPIKey, require("./get-id"));
router.post("/ping", checkAPIKey, require("./ping"));

module.exports = router;
