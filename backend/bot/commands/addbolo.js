const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addbolo")
    .setDescription(
      "BE ON THE LOOKOUT! (URL or attachment either can be used but required)",
    )
    .addStringOption(option =>
      option
        .setName("user")
        .setDescription("Username of offender.")
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName("streamer")
        .setDescription("Streamer's name offeneder fucked up.")
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName("reason")
        .setDescription("Reason for the BOLO.")
        .setRequired(true),
    )
    .addStringOption(option =>
      option
        .setName("url")
        .setDescription(
          "URL to the screenshot of the offensive content. (Limited to 1)",
        )
        .setRequired(false),
    ),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const user = interaction.options.getString("user");
      const streamer = interaction.options.getString("streamer");
      const reason = interaction.options.getString("reason");
      const image = interaction.options.getString("url");

      console.info(interaction.user.avatar.url);

      const avatarUrl = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`;

      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("** BE ON THE LOOKOUT **")
        .addFields([
          {
            name: "Username:",
            value: user,
            inline: true,
          },
          {
            name: "Streamer:",
            value: streamer,
            inline: true,
          },
          {
            name: "Reason:",
            value: reason,
          },
        ])
        .setImage(image)
        .setTimestamp()
        .setAuthor({
          name: interaction.user.username,
          iconURL: avatarUrl,
        });

      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      await interaction.editReply(e.toString());
    }
  },
};
