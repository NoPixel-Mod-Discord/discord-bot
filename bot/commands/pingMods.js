const { SlashCommandBuilder } = require("discord.js");
const { post } = require("axios");
require("dotenv").config();

const API_URL = process.env.SERVER_URL;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pingmods")
    .setDescription("Ping a streamer's mods")
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

    try {
      const list = [];

      const { data } = await post(
        `${API_URL}/api/v1/moderator/ping`,
        {
          streamer
        },
        {
          headers: {
            "x-api-key": process.env.SERVER_API_KEY
          }
        }
      );

      for (let i = 0; i < data.length; i++) {
        const user = "<@" + data[i] + ">";

        list.push(user);
      }

      if (list.length < 0) {
        return interaction.editReply({
          content: `No mods found for ${streamer} in database.`
        });
      }

      return (
        interaction.channel.send(` ${list.toString()}`) &&
        interaction.editReply(`Pinged mod ${streamer}`)
      );
    } catch (error) {
      console.error(error);
    }
  }
};
