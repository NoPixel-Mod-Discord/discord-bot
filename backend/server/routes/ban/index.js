const express = require("express");
const checkAPIKey = require("../../middleware");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/add", checkAPIKey, require("./add"));
router.get("/lookup", checkAPIKey, require("./lookup"));
router.patch("/update", checkAPIKey, require("./update"));
router.delete("/delete", checkAPIKey, require("./delete"));

module.exports = router;
