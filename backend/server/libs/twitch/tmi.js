const { Client } = require("tmi.js");
const { Config } = require("../../../config");
const botUtils = require("../../../bot/utils/utils");

const tmiClient = new Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: Config.twitchUsername,
    password: "oauth:" + Config.twitchAccessToken,
  },
});

tmiClient.connect().catch(err => console.error(err));

const getChannelMods = async streamer => {
  const mods = await tmiClient
    .mods(streamer)
    .then(res => res)
    .catch(err => {
      console.error(err);
      botUtils.log(err);
    });

  return mods;
};

const checkUserIsMod = async streamer => {
  const res = await tmiClient
    .mods(streamer)
    .then(mods => mods)
    .catch(err => {
      console.error(err);
      botUtils.log(err);
    });

  return res;
};

module.exports = {
  getChannelMods,
  checkUserIsMod,
};
