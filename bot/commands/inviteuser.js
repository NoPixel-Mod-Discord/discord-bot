require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitemod")
    .setDescription(
      "Creates a temporary invite link to invite users into server. (Link is active for 1 Hour)"
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const inviteUrl = await interaction.guild.channels.cache
      .find(channel => channel.id === interaction.channelId)
      .createInvite({
        maxAge: 3600,
        temporary: true,
        maxUses: 1
      })
      .then(invite => invite.url);

    await interaction.user.send(inviteUrl);

    await interaction.editReply({
      content: `An invite link has been sent to your dm.`
    });
  }
};
