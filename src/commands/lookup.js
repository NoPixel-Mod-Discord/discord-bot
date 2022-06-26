const { SlashCommandBuilder } = require("@discordjs/builders");
const { prisma } = require("../prisma");
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
    try {
      if (interaction.options.getString("venue") === "twitch") {
        const response = await prisma.ban
          .findMany({
            where: {
              userId: interaction.options.getString("user"),
              banVenue: interaction.options.getString("venue")
            }
          })
          .catch(err => console.error(err))
          .finally(async () => {
            await prisma.$disconnect();
          });

        if (response.length === 0) {
          await interaction.editReply({
            content: `No bans found for ${interaction.options.getString(
              "user"
            )}`
          });
        } else {
          for (const ban of response) {
            const userName = await getUserName(ban.userId);
            const streamerName = await getUserName(ban.channelId);
            await interaction.editReply({
              content: `${ban.moderatorId} banned ${userName} from ${streamerName} for ${ban.reason}`
            });
          }
        }
      } else {
        const response = await prisma.ban
          .findMany({
            where: {
              userId: interaction.options.getString("user"),
              banVenue: interaction.options.getString("venue")
            }
          })
          .catch(err => console.error(err))
          .finally(async () => {
            await prisma.$disconnect();
          });

        if (response.length === 0) {
          await interaction.editReply({
            content: `No bans found for ${interaction.options.getString(
              "user"
            )}`
          });
        } else {
          for (const ban of response) {
            await interaction.editReply({
              content: `${ban.moderatorId} banned ${ban.userId} from ${ban.channelId} for ${ban.reason}`
            });
          }
        }
      }
    } catch (err) {
      await interaction.editReply({ content: `User not found.` });
      console.error(err);
    }
  }
};
