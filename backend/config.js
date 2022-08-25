require("dotenv").config();

const Config = {
  serverPort: process.env.SERVER_PORT || 3333,
  serverApiKey: process.env.SERVER_API_KEY,
  serverApiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333"
      : process.env.API_ENDPOINT,
  twitchUsername: process.env.TWITCH_USER_NAME,
  twitchAccessToken: process.env.TWITCH_ACCESS_TOKEN,
  twitchClientId: process.env.TWITCH_CLIENT_ID,
  twitchClientSecret: process.env.TWITCH_CLIENT_SECRET,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  serverAdminRoleId: process.env.ADMIN_ROLE_ID,
  logChannel: '1012256507628359691'
};

module.exports = {
  Config,
};
