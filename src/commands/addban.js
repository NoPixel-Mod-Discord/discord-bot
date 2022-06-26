const { SlashCommandBuilder } = require("@discordjs/builders");
const { logBanTwitch, logBan } = require("../lib/prisma/logBans");

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
    })
    .addStringOption(evidence => {
      return evidence
        .setName("evidence")
        .setDescription("Evidence for the ban");
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const venue = interaction.options.getString("venue");
    const user = interaction.options.getString("user");
    const streamer = interaction.options.getString("streamer");
    const moderator = interaction.user.tag;
    const reason = interaction.options.getString("reason");
    const evidence = interaction.options.getString("evidence");

    if (venue === "twitch") {
      await logBanTwitch(venue, user, streamer, moderator, reason, evidence);
    } else {
      await logBan(venue, user, streamer, moderator, reason, evidence);
    }
    await interaction.editReply({
      content: `${user} is banned in ${streamer}'chat for ${reason} ${evidence}.`
    });
  }
};
