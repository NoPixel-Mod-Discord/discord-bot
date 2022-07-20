const { SlashCommandBuilder } = require("discord.js");
const tmi = require("tmi.js");

const tmiClient = new tmi.Client();

tmiClient.connect();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mods")
    .setDescription("Look up mods for twitch streamer")
    .addStringOption(streamer => {
      return streamer
        .setName("streamer")
        .setDescription("Name of the streamer you want to look mods for!")
        .setRequired(true);
    }),
  async execute(interaction) {
    const streamer = interaction.options.getString("streamer");

    const response = await tmiClient
      .mods(streamer)
      .then(data => data)
      .catch(err => err);

    await interaction.reply({
      content: `${response}`
    });
  }
};
