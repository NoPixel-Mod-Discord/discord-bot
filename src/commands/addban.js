const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../prisma");

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
    .addStringOption(venue => {
      return venue
        .setName("venue")
        .setDescription("The venue the ban was issued in")
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

    await prisma.ban.create({
      data: {
        banTime: new Date(),
        banVenue: interaction.options.getString("venue"),
        userId: interaction.options.getString("user"),
        channelId: interaction.options.getString("streamer"),
        moderatorId: interaction.user.id,
        reason: interaction.options.getString("reason")
      }
    });
    await interaction.editReply({
      content: `Logged ban for ${interaction.options.getString("user")}`
    });
  }
};
