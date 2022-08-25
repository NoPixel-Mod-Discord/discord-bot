const client = require("../index");
const { Config } = require("../../config");


/**
 * Sends a log to a discord channel
 * @param {String} str The message to send.
 */
function log(str) {
  client.channels.resolve(Config.logChannel).send(str);
}

module.exports = {
  log,
};
