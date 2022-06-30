const { client } = require("./index");

const getStreamers = async () => {
  await client.streamers
    .findMany()
    .catch(err => console.error(err))
    .finally(async () => {
      await client.$disconnect();
    });
};

module.exports = getStreamers;
