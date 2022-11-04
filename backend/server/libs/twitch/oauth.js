const fetch = require("node-fetch");
const { Config } = require("../../../config");

const clientId = Config.twitchClientId;
const clientSecret = Config.twitchClientSecret;
const refreshToken = Config.twitchRefreshToken;

const getAccessToken = async () => {
  const { access_token: accessToken } = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
    {
      method: "post",
    },
  ).then(res => res.json());

  return accessToken;
};

module.exports = {
  getAccessToken,
};
