const { SlashCommandBuilder } = require("@discordjs/builders");
const { client } = require("../lib/prisma/index");
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

    const user = interaction.options.getString("user");
    const venue = interaction.options.getString("venue");

    try {
      if (venue === "twitch") {
        const response = await client.bans
          .findMany({
            where: {
              userId: user
            }
          })
          .catch(err => console.error(err))
          .finally(async () => {
            await client.$disconnect();
          });

        console.log(response);
        if (response.length === 0) {
          await interaction.editReply({
            content: `No bans found for ${await getUserName(
              interaction.options.getString("user")
            )}`
          });
        } else {
          response.forEach(async ban => {
            const user = await getUserName(ban.userId);
            const streamer = await getUserName(ban.channelId);
            await interaction.editReply({
              content: `${ban.moderatorId} banned ${user} from ${streamer}'chat for ${ban.reason} ${ban.evidence}`
            });
          });
        }
      } else {
        const response = await client.bans
          .findMany({
            where: {
              userId: user
            }
          })
          .catch(err => console.error(err))
          .finally(async () => {
            await client.$disconnect();
          });

        if (response.length === 0) {
          await interaction.editReply({
            content: `No bans found for ${interaction.options.getString(
              "user"
            )}`
          });
        } else {
          response.forEach(async ban => {
            await interaction.editReply({
              content: `${ban.moderatorId} banned ${ban.userId} from ${ban.channelId} for ${ban.reason} ${ban.evidence}`
            });
          });
        }
      }
    } catch (err) {
      await interaction.editReply({ content: `User not found.` });
      console.error(err);
    }
  }
};
