const axios = require("axios");
const { Config } = require("../../config");
const { SlashCommandBuilder } = require("discord.js");

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
          { name: "Discord", value: "discord" },
        );
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const platform = interaction.options.getString("platform");
    let user = interaction.options.getString("user");

    user = user.toLowerCase();

    try {
      const { data } = await axios.get(
        `${Config.serverApiUrl}/api/v1/ban/lookup`,
        {
          data: {
            platform,
            user,
          },
          headers: {
            "x-api-key": Config.serverApiKey,
          },
        },
      );

      const fields = [];
      for (let i = 0; i < data.length; i++) {
        fields.push({
          id: data[i].id,
          name: `${data[i].userId} was banned in ${data[i].streamerId} by ${data[i].moderatorId} for ${data[i].reason}.`,
          value: ` Evidence: ${data[i].evidence}`,
        });
      }

      if (fields.length > 0) {
        return interaction.editReply({
          embeds: [{ fields }],
        });
      }

      return interaction.editReply({
        content: `No logs found for ${user}`,
      });
    } catch (e) {
      await interaction.editReply({
        content: e.response.data.err,
      });
    }
  },
};
