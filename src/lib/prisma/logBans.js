const { client } = require("./index");
const getUserId = require("../twitch/getUserId");

const logBanTwitch = async (
  platform,
  userName,
  streamerId,
  moderatorId,
  reason,
  evidence
) => {
  const userID = await getUserId(userName);
  const streamerID = await getUserId(streamerId);

  await client.ban
    .create({
      data: {
        banPlatform: platform,
        userId: userID,
        streamerId: streamerID,
        moderatorId: moderatorId,
        reason,
        evidence
      }
    })
    .catch(err => console.error(err))
    .finally(async () => {
      await client.$disconnect();
    });
};

const logBan = async (
  platform,
  userId,
  streamerId,
  moderatorId,
  reason,
  evidence
) => {
  await client.ban
    .create({
      data: {
        banPlatform: platform,
        userId,
        streamerId,
        moderatorId,
        reason,
        evidence
      }
    })
    .catch(err => console.error(err))
    .finally(async () => {
      await client.$disconnect();
    });
};

module.exports = {
  logBanTwitch,
  logBan
};
