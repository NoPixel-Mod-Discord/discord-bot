const { post } = require("axios");
require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

let API_URL;

if (process.env.NODE_ENV === "production") {
  API_URL = process.env.SERVER_URL;
} else {
  API_URL = "http://localhost:3333";
}

/** Todo
 * Verify moderator status
 */

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logban")
    .setDescription("Log a ban")
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
          { name: "Discord", value: "discord" }
        );
    })
    .addStringOption(evidence => {
      return evidence
        .setName("evidence")
        .setDescription("Evidence for the ban");
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const platform = interaction.options.getString("platform");
    let user = interaction.options.getString("user");
    const streamer = interaction.options.getString("streamer");
    const reason = interaction.options.getString("reason");
    const evidence = interaction.options.getString("evidence");

    user = user.toLowerCase();
    streamer = streamer.toLowerCase();

    // Get modrator's Twitch id from database
    const { data: moderator } = await post(
      `${API_URL}/get-moderator-id`,
      {
        moderatorId: interaction.user.id
      },
      {
        headers: {
          "x-api-key": process.env.SERVER_API_KEY
        }
      }
    );

    // Add ban to database
    try {
      const { data } = await post(
        `${API_URL}/add-ban`,
        {
          platform,
          user,
          streamer,
          moderator,
          reason,
          evidence
        },
        {
          headers: {
            "x-api-key": process.env.SERVER_API_KEY
          }
        }
      );

      const response =
        "`Ban Id:" +
        data.id +
        "`" +
        `\n ${user} is banned in ${streamer}'chat for ${reason} ${evidence}.`;

      if (data.reason === reason) {
        await interaction.editReply({
          content: response
        });
      } else {
        await interaction.editReply({
          content: `${data}`
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};
