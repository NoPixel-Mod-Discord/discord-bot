const { client } = require("./index");
const getUserId = require("../twitch/getUserId");

const logBanTwitch = async (
  venue,
  userId,
  streamerId,
  moderatorId,
  reason,
  evidence
) => {
  const userID = await getUserId(userId);
  const streamerID = await getUserId(streamerId);

  await client.bans
    .create({
      data: {
        banTime: new Date(),
        banVenue: venue,
        userId: userID,
        isBanned: true,
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
  venue,
  userId,
  streamerId,
  moderatorId,
  reason,
  evidence
) => {
  await prisma.ban
    .create({
      data: {
        banTime: new Date(),
        banVenue: venue,
        userId,
        streamerId,
        moderatorId,
        reason,
        evidence
      }
    })
    .catch(err => console.error(err))
    .finally(async () => {
      await prisma.$disconnect();
    });
};

module.exports = {
  logBanTwitch,
  logBan
};

// moderatorId: await getUserId(moderatorId)
