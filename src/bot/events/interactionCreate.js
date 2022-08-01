module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!"
      });
    }
  }
};
