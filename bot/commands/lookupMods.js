require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { getChannelMods } = require("../../server/libs/twitch/tmi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lookupmods")
    .setDescription("Look up mods for a streamer")
    .addStringOption(streamer => {
      return streamer
        .setName("streamer")
        .setDescription("The streamer you want to look mods for")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply();
    let streamer = interaction.options.getString("streamer");

    streamer = streamer.toLowerCase();

    const mods = await getChannelMods(streamer);

    const data = "```" + mods.join("\n") + "```";

    return interaction.editReply({
      content: data
    });
  }
};
