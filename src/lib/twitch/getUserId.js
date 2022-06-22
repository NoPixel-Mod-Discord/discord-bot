// Package Imports
const { get } = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix/users";

const getUserId = async userName => {
  const endpoint = TWITCH_ENDPOINT + "?login=" + userName;

  const response = await get(endpoint, {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${process.env.TWITCH_TOKEN}`
    }
  });
  const { id } = await response.data.data[0];

  return id;
};

module.exports = getUserId;
