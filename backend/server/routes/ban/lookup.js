const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const { getUserId, getUserName } = require("../../libs/twitch/twitch-api");

const lookupBan = async (req, res) => {
  const retVal = new ReturnValue();

  const { platform, user } = req.body;

  if (platform === "twitch") {
    try {
      const response = await prismaClient.ban
        .findMany({
          where: {
            userId: await getUserId(user),
          },
        })
        .finally(async () => {
          await prismaClient.$disconnect();
        });

      const data = [];

      for (let i = 0; i < response.length; i++) {
        data.push({
          id: response[i].id,
          userId: await getUserName(response[i].userId),
          streamerId: await getUserName(response[i].streamerId),
          moderatorId: await getUserName(response[i].moderatorId),
          reason: response[i].reason,
          evidence: response[i].evidence,
        });
      }

      retVal.body = data;
    } catch (e) {
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
            userId: user,
          },
        })
        .finally(async () => {
          await prismaClient.$disconnect();
        });

      const data = [];

      for (let i = 0; i < response.length; i++) {
        data.push({
          id: response[i].id,
          userId: response[i].userId,
          streamerId: response[i].streamerId,
          moderatorId: await getUserName(response[i].moderatorId),
          reason: response[i].reason,
          evidence: response[i].evidence,
        });
      }

      retVal.body = data;
    } catch (e) {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  }
};

module.exports = lookupBan;
