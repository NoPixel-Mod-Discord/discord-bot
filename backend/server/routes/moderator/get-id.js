const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const getModeratorId = async (req, res) => {
  const retVal = new ReturnValue();

  const { moderatorId } = req.body;

  try {
    const response = await prismaClient.mod
      .findUnique({
        where: {
          userDiscordId: moderatorId,
        },
      })
      .finally(async () => await prismaClient.$disconnect());

    retVal.body = response.userId;
  } catch (e) {
    retVal.status = 500;
    retVal.body.err =
      "You're not in the database. Please go to https://npbot.tech and connect you account to bot else something went wrong either try again or report to devs :(";
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
};

module.exports = getModeratorId;
