import { getActiveStreamers } from "@lib/hashroot/get-streamers";
import { GetServerSideProps, NextPage } from "next";

const Home: NextPage<PageProps> = ({ streamerList }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen dark:bg-gray-900">
      <div className="my-16">
        {streamerList.map((streamer, index) => (
          <div className="flex gap-4" key={index}>
            <span className="dark:text-gray-400">{index + 1}.</span>{" "}
            <span className="dark:text-white">{streamer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const streamers = await getActiveStreamers();

  const data = streamers.map(streamer => streamer.channelId);

  return {
    props: {
      streamerList: data,
    },
  };
};

interface PageProps {
  streamerList: string[];
}

// type StreamerData = {
//   userId: string;
//   lastOnline: Date;
//   channelId: string;
//   streamType: string;
// };
