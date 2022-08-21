import moment from "moment";
import { parse } from "node-html-parser";

const getStreamerList = async () => {
  const response = await fetch(
    "https://nopixel.hasroot.com/streamers.php",
  ).then(res => res.text());

  const data = parse(response || "");
  const list = data.querySelectorAll(".streamerInfo");

  const streamersList = list.map((tag: any) => {
    const info = tag._attrs;

    const streamerData: StreamerData = {
      userId: info["data-id"],
      lastOnline: new Date(info["data-lastonline"]),
      channelId: info["data-streamername"],
      streamType: "twitch",
    };

    return streamerData;
  });

  return streamersList;
};

export const getActiveStreamers = async () => {
  const streamersList = await getStreamerList();

  const filteredItems = streamersList.filter((streamer: StreamerData) => {
    const lastActive = moment(streamer.lastOnline);
    const monthAgo = moment().subtract(90, "days");

    return lastActive.isAfter(monthAgo);
  });

  return filteredItems;
};

type StreamerData = {
  userId: string;
  lastOnline: Date;
  channelId: string;
  streamType: string;
};
