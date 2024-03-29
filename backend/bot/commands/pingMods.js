const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { Config } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pingmods")
    .setDescription("Ping a streamer's mods")
    .addStringOption(streamer => {
      return streamer
        .setName("streamer")
        .setDescription("The streamer you want to ping mods for")
        .setRequired(true);
    })
    .addStringOption(reason => {
      return reason
        .setName("reason")
        .setDescription("Reason for pinging")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply();

    let streamer = interaction.options.getString("streamer");
    const reason = interaction.options.getString("reason");

    streamer = streamer.toLowerCase();

    try {
      const list = [];

      const { data } = await axios.get(
        `${Config.serverApiUrl}/api/v1/moderator/ping`,
        {
          data: {
            streamer,
          },
          headers: {
            "x-api-key": Config.serverApiKey,
          },
        },
      );

      for (let i = 0; i < data.length; i++) {
        const user = "<@" + data[i] + ">";

        list.push(user);
      }

      if (list.length > 0) {
        return (
          interaction.channel.send(` ${list.toString()}`) &&
          interaction.editReply(`Pinged mod ${streamer} ${reason}`)
        );
      }
      return interaction.editReply({
        content: `No mods found for ${streamer} in database.`,
      });
    } catch (e) {
      await interaction.editReply({
        content: e.response.data.err,
      });
    }
  },
};
