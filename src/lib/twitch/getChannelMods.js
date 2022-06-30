/* eslint-disable no-console */
// Package Imports
require("dotenv").config();
const tmi = require("tmi.js");
const { client } = require("../prisma/index");
const TWITCH_USERNAME = process.env.TWITCH_USERNAME;
const TWITCH_TOKEN = process.env.TWITCH_TOKEN;
const delay = 5000;

let checkChannels = [];
const checkedChannels = [];

const getChannelMods = async () => {
  const twitchClient = new tmi.client({
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username: TWITCH_USERNAME,
      password: TWITCH_TOKEN
    }
  });

  twitchClient.connect();

  twitchClient.on("connected", (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
    console.log(twitchClient);
    getAllMods();
  });

  const getAllMods = async () => {
    const response = await client.streamers
      .findMany()
      .catch(err => console.error(err))
      .finally(async () => {
        await client.$disconnect();
      });
    checkChannels = response;

    if (checkChannels.length !== 0) {
      const channel = checkChannels.shift();
      checkedChannels.push(channel);
      console.log(channel.channelId);
      twitchClient
        .mods(channel.channelId)
        .then(moderators => {
          console.log(`mods for ${channel}: ` + moderators);
          setTimeout(checkAllMods, delay);
        })
        .catch(err => console.log(err));
    } else {
      console.log("found mods for " + checkedChannels.length + " channels");
    }
  };
};

module.exports = getChannelMods;
