require("dotenv").config();
const { Client } = require("tmi.js");

const tmiClient = new Client({
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.TWITCH_USER_NAME,
    password: "oauth:" + process.env.TWITCH_ACCESS_TOKEN
  }
});

tmiClient.connect().catch(err => console.error(err));

const getChannelMods = async streamer => {
  const mods = await tmiClient
    .mods(streamer)
    .then(res => res)
    .catch(err => console.error(err));

  return mods;
};

const checkUserIsMod = async streamer => {
  const res = await tmiClient
    .mods(streamer)
    .then(mods => mods)
    .catch(err => console.error(err));

  return res;
};

module.exports = {
  getChannelMods,
  checkUserIsMod
};
