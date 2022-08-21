const express = require("express");
const checkAPIKey = require("../../middleware");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/add", checkAPIKey, require("./add"));
router.post("/lookup", checkAPIKey, require("./lookup"));
router.post("/update", checkAPIKey, require("./update"));
router.post("/delete", checkAPIKey, require("./delete"));

module.exports = router;
