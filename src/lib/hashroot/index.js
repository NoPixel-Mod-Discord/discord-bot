// const { prisma } = require("../prisma");
// require("dotenv").config();
// const axios = require("axios");
// const HTMLParser = require("node-html-parser");

// const addStreamersFromHasroot = async () => {
//   const response = await axios("https://nopixel.hasroot.com/streamers.php")
//     .then(res => res)
//     .catch(err => {
//       console.error(err);
//     });

//   const root = HTMLParser.parse(response.data);
//   const data = await root.querySelectorAll(".streamerInfo");

//   const streamersArray = [];

//   data.forEach(async tag => {
//     info = tag._attrs;

//     const streamerData = {
//       userId: info["data-id"],
//       lastOnline: new Date(info["data-lastonline"]),
//       channelId: info["data-streamername"],
//       streamType: "twitch"
//     };

//     streamersArray.push(streamerData);
//   });

//   streamersArray.map(async streamerData => {
//     await prisma.streamer
//       .createMany({
//         data: streamerData,
//         skipDuplicates: true
//       })
//       .catch(err => console.error(err))
//       .finally(async () => {
//         await prisma.$disconnect();
//       });
//   });
// };

// module.exports = addStreamersFromHasroot;
