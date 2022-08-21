const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");
const { getUserName } = require("../../libs/twitch/twitch-api");

const lookupBan = async (req, res) => {
  const retVal = new ReturnValue();

  const { banId } = req.body;

  try {
    const response = await prismaClient.ban
      .delete({
        where: {
          id: banId,
        },
      })
      .finally(async () => {
        await prismaClient.$disconnect();
      });

    const res = {
      id: response.id,
      moderatorId: await getUserName(response.moderatorId),
    };

    retVal.body = res;
  } catch (e) {
    retVal.status = 500;
    retVal.body.err = "Something went wrong :(";
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
};

module.exports = lookupBan;
