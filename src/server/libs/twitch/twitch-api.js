const { get } = require("axios");
require("dotenv").config();

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix";

const getUserId = async userName => {
  const URL = TWITCH_ENDPOINT + "/users?login=" + userName;

  try {
    const response = await get(URL, {
      Headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_TOKEN}`
      }
    });

    const { id } = await response.data.data[0];

    return id;
  } catch (error) {
    console.error(error);
  }
};

const getUserName = async userId => {
  const URL = TWITCH_ENDPOINT + "/users?id=" + userId;

  try {
    const response = await get(URL, {
      Headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${process.env.TWITCH_TOKEN}`
      }
    });

    const { login } = await response.data.data[0];

    return login;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUserId,
  getUserName
};
