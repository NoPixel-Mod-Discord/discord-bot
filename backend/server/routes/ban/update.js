const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");

const addBan = async (req, res) => {
  const retVal = new ReturnValue();

  const { banId, reason, evidence } = req.body;

  if (reason === null) {
    try {
      const response = await prismaClient.ban
        .update({
          where: {
            id: banId,
          },
          data: {
            evidence: evidence,
          },
        })

        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (e) {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  } else if (evidence === null) {
    try {
      const response = await prismaClient.ban
        .update({
          where: {
            id: banId,
          },
          data: {
            reason: reason,
          },
        })

        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (e) {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  } else {
    try {
      const response = await prismaClient.ban
        .update({
          where: {
            id: banId,
          },
          data: {
            reason: reason,
            evidence: evidence,
          },
        })

        .finally(async () => {
          await prismaClient.$disconnect();
        });

      retVal.body = response;
    } catch (e) {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    } finally {
      res.status(retVal.status).json(retVal.body);
    }
  }
};

module.exports = addBan;
