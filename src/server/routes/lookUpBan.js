const ReturnValue = require("../utils/models");
const express = require("express");
const checkAPIKey = require("../middleware");
const { prismaClient } = require("../libs/prisma");

const { getUserId } = require("../libs/twitch/twitch-api");

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/", checkAPIKey, async (req, res) => {
  const retVal = new ReturnValue();

  const { platform, user } = req.body;

  if (platform === "twitch") {
    try {
      const response = await prismaClient.ban
        .findMany({
          where: {
            userId: await getUserId(user)
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
        .findMany({
          where: {
            userId: user
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
