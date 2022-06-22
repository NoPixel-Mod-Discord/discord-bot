// // Package Imports
// require("dotenv").config();
// const tmi = require("tmi.js");

// const accessToken = process.env.TWITCH_TOKEN;
// const delay = 5000;

// let checkChannels = ["ishn4ke", "swizzmb", "lozdog", "silent", "shotz"];
// let checkedChannels = [];

// const init = async () => {
//   const client = new tmi.client({
//     connection: {
//       reconnect: true,
//       secure: true
//     },
//     identity: {
//       username: "ishn4ke",
//       password: "oauth:" + accessToken
//     }
//   });

//   client.connect();

//   client.on("connected", (addr, port) => {
//     console.log(`* Connected to ${addr}:${port}`);
//     checkAllMods();
//   });

//   const checkAllMods = () => {
//     if (checkChannels.length === 0) {
//       checkChannels = checkedChannels;
//       checkedChannels = [];
//     }
//     const channel = checkChannels.shift();
//     checkedChannels.push(channel);
//     client.mods(channel).then(moderators => {
//       console.log(`mods for ${channel}: ` + moderators);
//       setTimeout(checkAllMods, delay);
//     });
//   };
// };

// init();
