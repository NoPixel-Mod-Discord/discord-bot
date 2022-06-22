const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../prisma");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lookup")
    .setDescription("Lookup a user")
    .addStringOption(user => {
      return user
        .setName("user")
        .setDescription("Search for banned user")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction.deferReply();
    const response = await prisma.ban.findMany({
      where: {
        userId: interaction.options.getString("user")
      }
    });

    if (response.length === 0) {
      await interaction.editReply({
        content: `No bans found for ${interaction.options.getString("user")}`
      });
    } else {
      await interaction.editReply({
        content: `Bans found for ${interaction.options.getString("user")}`
      });
      for (const ban of response) {
        await interaction.editReply({
          content: `${ban.moderator_id} banned ${ban.user_id} from ${ban.channel_id} for ${ban.reason}`
        });
      }
    }
  }
};
