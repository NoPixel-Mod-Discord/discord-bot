const ReturnValue = require("../utils/models");
const express = require("express");
const checkAPIKey = require("../middleware");
const { prismaClient } = require("../libs/prisma");

const { getUserId, getUserName } = require("../libs/twitch/twitch-api");
const { checkUserIsMod } = require("../libs/twitch/tmi");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", checkAPIKey, async (req, res) => {
  const retVal = new ReturnValue();

  const { platform, user, streamer, moderator, reason, evidence } = req.body;

  if (platform === "twitch") {
    const modUserName = await getUserName(moderator);

    const userIsMod = await checkUserIsMod(streamer);

    try {
      if (userIsMod.includes(modUserName) === true) {
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
      } else {
        retVal.body = `You are not a mod for ${streamer}`;
      }
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
