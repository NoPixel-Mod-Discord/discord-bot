const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../prisma");
const getUserId = require("../lib/twitch/getUserId");
const getUserName = require("../lib/twitch/getUserName");

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
    try {
      const response = await prisma.ban.findMany({
        where: {
          userId: await getUserId(interaction.options.getString("user"))
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
          const userName = await getUserName(ban.userId);
          await interaction.editReply({
            content: `${ban.moderatorId} banned ${userName} from ${ban.channelId} for ${ban.reason}`
          });
        }
      }
    } catch (err) {
      await interaction.editReply({ content: `User not found.` });
    }
  }
};
