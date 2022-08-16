const { default: axios } = require("axios");
require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { getUserName } = require("../../server/libs/twitch/twitch-api");

const API_URL = process.env.SERVER_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lookupban")
    .setDescription("Look Up a ban")
    .addStringOption(user => {
      return user
        .setName("user")
        .setDescription("The user to log a ban for")
        .setRequired(true);
    })
    .addStringOption(platform => {
      return platform
        .setName("platform")
        .setDescription("The platform the ban was issued in")
        .setRequired(true)
        .addChoices(
          { name: "Twitch", value: "twitch" },
          { name: "YouTube", value: "youtube" },
          { name: "Facebook", value: "facebook" },
          { name: "Discord", value: "discord" }
        );
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const platform = interaction.options.getString("platform");
    let user = interaction.options.getString("user");

    user = user.toLowerCase();

    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/ban/lookup`,
        {
          platform,
          user
        },
        {
          headers: {
            "x-api-key": process.env.SERVER_API_KEY
          }
        }
      );

      const fields = [];
      for (let i = 0; i < data.length; i++) {
        fields.push({
          name: `${
            data[i].platform === "twitch"
              ? await getUserName(data[i].userId)
              : data[i].userId
          } was banned in ${
            data[i].platform === "twitch"
              ? await getUserName(data[i].streamerId)
              : data[i].streamerId
          } by ${await getUserName(data[i].moderatorId)} for ${
            data[i].reason
          }.`,
          value: ` Evidence: ${data[i].evidence}`
        });
      }

      if (fields.length > 0) {
        return interaction.editReply({
          embeds: [{ fields }]
        });
      }

      return interaction.editReply({
        content: `No logs found for ${user}`
      });
    } catch (error) {
      await interaction.editReply({
        content: `${error.response.data.err}`
      });
    }
  }
};
