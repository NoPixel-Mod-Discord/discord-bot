// Package Imports
const { get } = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix/users";

const getUserName = async id => {
  const endpoint = TWITCH_ENDPOINT + "?id=" + id;

  const response = await get(endpoint, {
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${process.env.TWITCH_TOKEN}`
    }
  });
  const { login } = await response.data.data[0];

  return login;
};

module.exports = getUserName;
