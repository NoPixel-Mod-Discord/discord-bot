const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const { Config } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deleteban")
    .setDescription("Delete a ban.")
    .addStringOption(option => {
      return option
        .setName("banid")
        .setDescription("Id of the ban you want to delete.")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply();
    let banId = interaction.options.getString("banid");

    banId = parseInt(banId);

    try {
      const { data } = await axios.delete(
        `${Config.serverApiUrl}/api/v1/ban/delete`,
        {
          data: {
            banId,
          },
          headers: {
            "x-api-key": Config.serverApiKey,
          },
        },
      );

      await interaction.editReply({
        content:
          "`" +
          `Deleted ban for id:` +
          data.id +
          ` logged by ${data.moderatorId}` +
          "`",
      });
    } catch (e) {
      await interaction.editReply({
        content: `${e.response.data.err}`,
      });
    }
  },
};
