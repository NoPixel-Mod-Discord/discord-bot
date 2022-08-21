const { default: axios } = require("axios");
const moment = require("moment");
const { default: parse } = require("node-html-parser");

const getAllStreamerList = async () => {
  const response = await axios("https://nopixel.hasroot.com/streamers.php")
    .then(res => res)
    .catch(err => console.error(err));

  const root = parse(response.data);
  const data = root.querySelectorAll(".streamerInfo");

  const streamersList = data.map(tag => {
    const info = tag._attrs;

    const streamerData = {
      userId: info["data-id"],
      lastOnline: new Date(info["data-lastonline"]),
      channelId: info["data-streamername"],
      streamType: "twitch",
    };

    return streamerData;
  });

  return streamersList;
};

const getFilteredStreamers = async () => {
  const streamersList = await getAllStreamerList();

  const filteredItems = streamersList.filter(streamer => {
    const lastActive = moment(streamer.lastOnline);
    const monthAgo = moment().subtract(90, "days");

    return lastActive.isAfter(monthAgo);
  });

  return filteredItems;
};

module.exports = getFilteredStreamers;
