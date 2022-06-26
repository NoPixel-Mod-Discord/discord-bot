// Package Imports
const fs = require("fs");
const path = require("path");
const { Client, Intents, Collection } = require("discord.js");

require("dotenv").config();

// Env Variables
const token = process.env.DISCORD_BOT_TOKEN;

// Client
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// Events
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

// Commands
const commands = [];
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

module.exports = client;

// Client Login
client.login(token);

// const addStreamersFromHasroot = require("./lib/hashroot");

// addStreamersFromHasroot();
