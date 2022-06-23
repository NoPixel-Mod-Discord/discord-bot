require("dotenv").config();
const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter(file => file.endsWith(".js"));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./src/events")
  .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands));
  }
}

client.login(process.env.DISCORD_BOT_TOKEN);


//////////////////
////TWITCH BOT////
//////////////////
const tmi = require("tmi.js");
const twitchFunctions = require(`./functions/twitch.js`);
const botconfig = require("./botconfig.json");
const hasroot = require('./functions/hasroot.js')

let channelNames = [];

async function getStreamers () {
  channels = await hasroot.getActiveStreamers(100); // get streamers who have streamed GTA in the last 100 days
  channels.forEach(channel => {
    channelNames.push(channel.name)
  });
}

getStreamers();

//Define TMI config options
const options = {
    options: {
        clientId: process.env.CLIENT_ID,
        debug: false,
    },
    connection: {
        cluster: "aws",
        reconnect: true,
        maxReconnectInterval: 60000,
        reconnectInterval: 2000,
        secure: true,
    },
    identity: {
        username: process.env.TWITCHBOT_USERNAME,
        password: process.env.TWITCHBOT_TOKEN,
    },
    channels: channelNames
}


//Create a new TMI client instance
const twitch_client = new tmi.client(options);

//Connect the bot to all Twitch channels
twitch_client.connect();

//Run when the bot connects to Twitch
twitch_client.on("connected", (address, port) => {
    twitchFunctions.onConnect(options);
});

//Log if the bot disconnects from Twitch
twitch_client.on("disconnected", (reason) => {
    twitchFunctions.onDisconnect(options);
});

//Run on a ban done by a moderator/broadcaster in a twitch channel
twitch_client.on("ban", (channel, username, reason, userstate) => { // reason always null & userstate unused?
    twitchFunctions.onBan(channel, username, botconfig, client);
});

//Run on a timeout done by a moderator/broadcaster in a twitch channel
twitch_client.on("timeout", (channel, username, reason, duration, userstate) => {
    twitchFunctions.onTimeout(channel, username, duration, botconfig, client);
});
