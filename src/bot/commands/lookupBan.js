const { post } = require("axios");
require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { getUserName } = require("../../server/libs/twitch/twitch-api");

let API_URL;

if (process.env.NODE_ENV === "production") {
  API_URL = process.env.SERVER_URL;
} else {
  API_URL = "http://localhost:3333";
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("banlookup")
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
      const { data } = await post(
        `${API_URL}/lookup-ban`,
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
          name: `${await getUserName(
            data[i].userId
          )} was banned in ${await getUserName(
            data[i].streamerId
          )} by ${await getUserName(data[i].moderatorId)} for ${
            data[i].reason
          }.`,
          value: ` Evidence: ${data[i].evidence}`
        });
      }

      return interaction.editReply({
        embeds: [{ fields }]
      });
    } catch (error) {
      console.error(error);
    }
  }
};
