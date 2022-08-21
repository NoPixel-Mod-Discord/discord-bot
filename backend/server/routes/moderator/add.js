const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const addModerator = async (req, res) => {
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
          modType: "twitch",
        },
      })
      .finally(async () => {
        await prismaClient.$disconnect();
      });
    retVal.body = response;
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        retVal.status = 500;
        retVal.body.err =
          "You are already in the database. Please stop spamming.";
      }
    } else {
      retVal.status = 500;
      retVal.body.err = "Something went wrong :(";
    }
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
};

module.exports = addModerator;
