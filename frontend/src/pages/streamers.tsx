import { getActiveStreamers } from "@lib/hashroot/get-streamers";
import { GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

const Home: NextPage<PageProps> = ({ streamerList }) => {
  return (
    <Suspense fallback={`Loading...`}>
      <div className="flex flex-col mx-auto w-full h-full dark:bg-gray-900 overflow-auto">
        <div className="mx-auto my-16">
          {streamerList.map((streamer, index) => (
            <div className="flex gap-4" key={index}>
              <span className="dark:text-gray-400">{index + 1}.</span>{" "}
              <span className="dark:text-white">{streamer}</span>
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const streamers = await getActiveStreamers();

  const data = streamers.map(streamer => streamer.channelId);

  return {
    props: {
      streamerList: data,
    },
    revalidate: 86400,
  };
};

interface PageProps {
  streamerList: string[];
}
