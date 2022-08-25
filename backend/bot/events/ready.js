const utils = require("../utils/utils");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.info(`Ready! Logged in as ${client.user.tag}`);
    utils.log('Bot is ready!');
  },
};
