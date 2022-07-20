const ReturnValue = require("../utils/models");
const express = require("express");
const checkAPIKey = require("../middleware");
const { prismaClient } = require("../libs/prisma");

const { getUserId } = require("../libs/twitch/twitch-api");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", checkAPIKey, async (req, res) => {
  const retVal = new ReturnValue();

  const { platform, user, streamer, moderator, reason, evidence } = req.body;

  if (platform === "twitch") {
    try {
      const response = await prismaClient.ban
        .create({
          data: {
            bannedAt: new Date(),
            banPlatform: platform,
            userId: await getUserId(user),
            isBanned: true,
            streamerId: await getUserId(streamer),
            moderatorId: moderator,
            reason,
            evidence
          }
        })
        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (error) {
      console.error(error);
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  } else {
    try {
      const response = await prismaClient.ban
        .create({
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
        })
        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (error) {
      console.error(error);
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  }
});

module.exports = router;
