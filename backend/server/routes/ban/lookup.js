const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const { getUserId } = require("../../libs/twitch/twitch-api");

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
            userId: user,
          },
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
};

module.exports = lookupBan;
