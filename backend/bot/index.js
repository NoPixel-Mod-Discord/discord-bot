// Require necessary packages
const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Config } = require("../config");

// Require dotenv to import ENV Variables
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Handle Commands
const commandsArray = [];
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commandsArray.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}
// Adds commands to bot on startup
const rest = new REST({ version: "9" }).setToken(Config.discordBotToken);
(async () => {
  await rest.put(Routes.applicationCommands(Config.discordClientId), {
    body: commandsArray,
  });
})();

// Handle Events
const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith(".js"));

for (const file of eventsFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with your client's token
client.login(Config.discordBotToken);

module.exports = client;
