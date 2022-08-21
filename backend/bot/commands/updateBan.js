const { post } = require("axios");
require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

const API_URL = process.env.SERVER_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updateban")
    .setDescription("Update a ban.")
    .addStringOption(banid => {
      return banid
        .setName("banid")
        .setDescription("Id for the ban you want to update.")
        .setRequired(true);
    })
    .addStringOption(reason => {
      return reason.setName("reason").setDescription("The reason for the ban");
    })
    .addStringOption(evidence => {
      return evidence
        .setName("evidence")
        .setDescription("Evidence for the ban");
    }),
  async execute(interaction) {
    await interaction.deferReply();
    let banId = interaction.options.getString("banid");
    const reason = interaction.options.getString("reason");
    const evidence = interaction.options.getString("evidence");

    banId = parseInt(banId);

    try {
      const { data } = await post(
        `${API_URL}/api/v1/ban/update`,
        {
          banId,
          reason,
          evidence,
        },
        {
          headers: {
            "x-api-key": process.env.SERVER_API_KEY,
          },
        },
      );

      if (reason === null) {
        const response =
          "Updated evidence for" + "`Ban Id:" + data.id + "` " + data.evidence;
        await interaction.editReply({
          content: response,
        });
      } else if (evidence === null) {
        const response =
          "Updated reason for " + "`Ban Id:" + data.id + "` " + data.reason;
        await interaction.editReply({
          content: response,
        });
      } else {
        const response =
          "Updated reason and evidence for" +
          "`Ban Id:" +
          data.id +
          "` " +
          data.reason +
          "," +
          data.evidence;

        await interaction.editReply({
          content: response,
        });
      }
    } catch (error) {
      await interaction.editReply({
        content: `${error.response.data.err}`,
      });
    }
  },
};
