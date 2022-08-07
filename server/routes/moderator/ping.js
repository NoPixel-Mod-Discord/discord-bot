const ReturnValue = require("../../utils/models");
const { prismaClient } = require("../../libs/prisma");
const { getChannelMods } = require("../../libs/twitch/tmi");
const { getUserId } = require("../../libs/twitch/twitch-api");

const pingMods = async (req, res) => {
  const retVal = new ReturnValue();

  const { streamer } = req.body;

  try {
    const modList = await getChannelMods(streamer);

    const list = [];

    for (let i = 0; i < modList.length; i++) {
      const userTwitchId = await getUserId(modList[i]);

      if (!userTwitchId) return;

      const response = await prismaClient.mod.findUnique({
        where: {
          userId: userTwitchId
        }
      });

      if (response !== null) {
        list.push(response.userDiscordId);
      }
    }

    retVal.body = list;
  } catch (error) {
    console.error(error);
    retVal.status = 500;
    retVal.body.err = "Something went wrong :(";
  } finally {
    res.status(retVal.status).json(retVal.body);
  }
};

module.exports = pingMods;
