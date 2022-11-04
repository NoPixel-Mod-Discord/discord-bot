const { Config } = require("../../../config");
const { getAccessToken } = require("./oauth");
const fetch = require("node-fetch");

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix";

const getUserId = async userName => {
  const URL = TWITCH_ENDPOINT + "/users?login=" + userName;

  const accessToken = await getAccessToken();

  try {
    const response = await fetch(URL, {
      headers: {
        "Client-Id": Config.twitchClientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(res => res.json());

    const { id } = await response.data[0];

    return id;
  } catch (e) {
    return e;
  }
};

const getUserName = async userId => {
  const URL = TWITCH_ENDPOINT + "/users?id=" + userId;

  const accessToken = await getAccessToken();

  try {
    const response = await fetch(URL, {
      headers: {
        "Client-Id": Config.twitchClientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(res => res.json());

    const { login } = await response.data[0];

    return login;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getUserId,
  getUserName,
};
