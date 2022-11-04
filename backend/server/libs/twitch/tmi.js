const { Client } = require("tmi.js");
const { Config } = require("../../../config");

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
    });

  return mods;
};

const getModList = async streamer => {
  const res = await tmiClient
    .mods(streamer)
    .then(mods => mods)
    .catch(err => {
      console.error(err);
    });

  return res;
};

module.exports = {
  getChannelMods,
  getModList,
};
