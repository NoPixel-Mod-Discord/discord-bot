const { default: axios } = require("axios");
require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

const API_URL = process.env.SERVER_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deleteban")
    .setDescription("Delete a ban.")
    .addStringOption(banid => {
      return banid
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
        `${API_URL}/api/v1/ban/update`,
        {
          banId
        },
        {
          headers: {
            "x-api-key": process.env.SERVER_API_KEY
          }
        }
      );

      await interaction.editReply({
        content:
          "`" +
          `Deleted ban for id:` +
          data.id +
          ` logged by ${data.moderatorId}` +
          "`"
      });
    } catch (error) {
      await interaction.editReply({
        content: `${error.response.data.err}`
      });
    }
  }
};
