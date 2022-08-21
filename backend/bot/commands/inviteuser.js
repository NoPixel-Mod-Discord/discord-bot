require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitemod")
    .setDescription(
      "Creates a temporary invite link to invite users into server. (Link is active for 12 Hour)",
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const inviteUrl = await interaction.guild.channels.cache
      .find(channel => channel.id === interaction.channelId)
      .createInvite({
        maxAge: 43200,
        temporary: true,
        maxUses: 1,
      })
      .then(invite => invite.url);

    await interaction.user.send(inviteUrl);

    await interaction.editReply({
      content:
        "<@" +
        interaction.user.id +
        ">" +
        ` An invite link has been sent to your dm.`,
    });
  },
};
