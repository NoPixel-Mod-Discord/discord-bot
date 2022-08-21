const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const { getUserId, getUserName } = require("../../libs/twitch/twitch-api");
const { checkUserIsMod } = require("../../libs/twitch/tmi");
const { PrismaClientValidationError } = require("@prisma/client/runtime");

const addBan = async (req, res) => {
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
              evidence,
            },
          })

          .finally(async () => {
            await prismaClient.$disconnect();
          });

        retVal.body = response;
      } else {
        retVal.body = `You are not a mod for ${streamer}`;
      }
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        retVal.status = 500;
        retVal.body.err =
          "Username is incorrect or does not exist in Twitch database.";
      } else {
        retVal.status = 500;
        retVal.body.err = "Something went wrong :(";
      }
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
            evidence,
          },
        })
        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (error) {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  }
};

module.exports = addBan;
