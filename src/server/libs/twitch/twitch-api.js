const { get } = require("axios");
require("dotenv").config();
const { getTwitchAccessToken } = require("@jlengstorf/get-twitch-oauth");

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix";

const getUserId = async userName => {
  const URL = TWITCH_ENDPOINT + "/users?login=" + userName;

  const { access_token: accessToken } = await getTwitchAccessToken({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    scopes: "user:read:email"
  });

  try {
    const response = await get(URL, {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { id } = await response.data.data[0];

    return id;
  } catch (error) {
    return error;
  }
};

const getUserName = async userId => {
  const URL = TWITCH_ENDPOINT + "/users?id=" + userId;

  const { access_token: accessToken } = await getTwitchAccessToken({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    scopes: "user:read:email"
  });

  try {
    const response = await get(URL, {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { login } = await response.data.data[0];

    return login;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getUserId,
  getUserName
};
