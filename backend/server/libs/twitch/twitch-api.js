const { get } = require("axios");
const { getTwitchAccessToken } = require("@jlengstorf/get-twitch-oauth");
const { Config } = require("../../../config");

const TWITCH_ENDPOINT = "https://api.twitch.tv/helix";

const getUserId = async userName => {
  const URL = TWITCH_ENDPOINT + "/users?login=" + userName;

  const { access_token: accessToken } = await getTwitchAccessToken({
    client_id: Config.twitchClientId,
    client_secret: Config.twitchClientSecret,
    scopes: "user:read:email",
  });

  try {
    const response = await get(URL, {
      headers: {
        "Client-ID": Config.twitchClientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { id } = await response.data.data[0];

    return id;
  } catch (e) {
    return e;
  }
};

const getUserName = async userId => {
  const URL = TWITCH_ENDPOINT + "/users?id=" + userId;

  const { access_token: accessToken } = await getTwitchAccessToken({
    client_id: Config.twitchClientId,
    client_secret: Config.twitchClientSecret,
    scopes: "user:read:email",
  });

  try {
    const response = await get(URL, {
      headers: {
        "Client-ID": Config.twitchClientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { login } = await response.data.data[0];

    return login;
  } catch (e) {
    return e;
  }
};

module.exports = {
  getUserId,
  getUserName,
};
