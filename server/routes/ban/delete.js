const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const lookupBan = async (req, res) => {
  const retVal = new ReturnValue();

  const { banId } = req.body;

  try {
    const response = await prismaClient.ban
      .delete({
        where: {
          id: banId
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
};

module.exports = lookupBan;
