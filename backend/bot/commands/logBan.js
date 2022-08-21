const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");
const { Config } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addban")
    .setDescription("Log a ban.")
    .addStringOption(user => {
      return user
        .setName("user")
        .setDescription("The user to log a ban for")
        .setRequired(true);
    })
    .addStringOption(streamer => {
      return streamer
        .setName("streamer")
        .setDescription("Name of the streamer user is banned from")
        .setRequired(true);
    })
    .addStringOption(reason => {
      return reason
        .setName("reason")
        .setDescription("The reason for the ban")
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
    })
    .addStringOption(evidence => {
      return evidence
        .setName("evidence")
        .setDescription("Evidence for the ban")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const platform = interaction.options.getString("platform");
    let user = interaction.options.getString("user");
    let streamer = interaction.options.getString("streamer");
    const reason = interaction.options.getString("reason");
    const evidence = interaction.options.getString("evidence");

    user = user.toLowerCase();
    streamer = streamer.toLowerCase();

    // Get modrator's Twitch id from database
    try {
      const { data: moderator } = await axios.get(
        `${Config.serverApiUrl}/api/v1/moderator/get-id`,
        {
          data: {
            moderatorId: interaction.user.id,
          },
          headers: {
            "x-api-key": Config.serverApiKey,
          },
        },
      );

      //  Add ban to database
      try {
        const { data } = await axios.post(
          `${Config.serverApiUrl}/api/v1/ban/add`,
          {
            platform,
            user,
            streamer,
            moderator,
            reason,
            evidence,
          },
          {
            headers: {
              "x-api-key": Config.serverApiKey,
            },
          },
        );

        const response =
          "`Ban Id:" +
          data.id +
          "`" +
          `\n ${user} is banned in ${streamer}'s chat for ${reason} ${evidence}.`;

        await interaction.editReply({
          content: response,
        });
      } catch (e) {
        await interaction.editReply({
          content: e.response.data.err,
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: e.response.data.err,
      });
    }
  },
};
