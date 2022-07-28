const ReturnValue = require("../utils/models");
const express = require("express");
const checkAPIKey = require("../middleware");
const { prismaClient } = require("../libs/prisma");

// const { checkUserIsMod } = require("../libs/twitch/tmi");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", checkAPIKey, async (req, res) => {
  const retVal = new ReturnValue();

  const { userDiscordId, userId } = req.body;

  try {
    const response = await prismaClient.mod
      .create({
        data: {
          userDiscordId,
          userId,
          createdAt: new Date(),
          isVerified: true,
          modType: "twitch"
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
});

module.exports = router;
