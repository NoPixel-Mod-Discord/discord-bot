const { SlashCommandBuilder } = require("@discordjs/builders");
const hasroot = require('../functions/hasroot.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fetch")
    .setDescription("Get all streamers from Hasroot and update streamer table"),

  async execute(message) {
    const returnmsg = await hasroot.addStreamersFromHasroot()
    message.reply(returnmsg);
  }
};
