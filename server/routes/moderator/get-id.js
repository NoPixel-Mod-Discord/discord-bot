const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const getModeratorId = async (req, res) => {
  const retVal = new ReturnValue();

  const { moderatorId } = req.body;

  try {
    const response = await prismaClient.mod
      .findUnique({
        where: {
          userDiscordId: moderatorId
        }
      })
      .finally(async () => await prismaClient.$disconnect());

    retVal.body = response.userId;
  } catch (error) {
    console.error(error);
    retVal.status = 500;
    retVal.body.err = "Something went wrong :(";
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
};

module.exports = getModeratorId;
