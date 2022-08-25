const utils = require("../utils/utils");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.execute(interaction);
    } catch (error) {
      utils.log(err);
      interaction.reply({
        content: "There was an error while executing this command!",
      });
    }
  },
};
