const express = require("express");
const checkAPIKey = require("../../middleware");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/add", checkAPIKey, require("./add"));
router.get("/get-id", checkAPIKey, require("./get-id"));
router.get("/ping", checkAPIKey, require("./ping"));

module.exports = router;
