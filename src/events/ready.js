// Package Imports
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Env Variables
const token = process.env.DISCORD_BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

// Deploy Commands on Connect
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const rest = new REST({ version: "9" }).setToken(token);

    // Fetch Commands
    const commands = [];
    const commandsPath = path.join(__dirname, "../commands");
    const commandsFiles = fs
      .readdirSync(commandsPath)
      .filter(file => file.endsWith(".js"));

    for (const file of commandsFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }

    // Deploy Commands
    try {
      if (process.env.NODE_ENV === "production") {
        await rest.api
          .put(Routes.applicationGuildCommands(clientId), {
            data: commands
          })
          .then(() => {
            console.info("Commands Successfully Set");
          });
      } else {
        await rest
          .put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands
          })
          .then(() => {
            console.info("Commands Successfully Set");
          });
      }
    } catch (err) {
      console.error(err);
    }
    console.info(`Ready! Logged in as ${client.user.tag}`);
  }
};
