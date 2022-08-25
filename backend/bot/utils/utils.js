const { WebhookClient } = require("discord.js");
const logger = new WebhookClient({ url: process.env.LOG_WEBHOOK });


/**
 * Sends a log to a discord channel
 * @param {String} str The message to send.
 */
function log(str) {
  logger.send(str);
}

module.exports = {
  log,
};
