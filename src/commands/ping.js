const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Test command for bot"),

  async execute(message) {
    message.reply("pong");
  }
};
