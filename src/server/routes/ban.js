const ReturnValue = require("../utils/models");
const express = require("express");
const checkAPIKey = require("../middleware");
const prismaClient = require("../libs/prisma");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", checkAPIKey, async (req, res) => {
  const retVal = new ReturnValue();

  const { platform, user, streamer, moderator, reason, evidence } = req.body;

  try {
    const response = await prismaClient.ban.create({
      data: {
        bannedAt: new Date(),
        banPlatform: platform,
        userId: user,
        isBanned: true,
        streamerId: streamer,
        moderatorId: moderator,
        reason,
        evidence
      }
    });

    retVal.body = response;
  } catch (error) {
    console.error(error);
    retVal.status = 500;
    retVal.body.err = "Something went wrong :(";
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
});

module.exports = router;
