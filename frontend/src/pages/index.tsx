import { getUserTwitchConnection } from "@lib/discord";
import axios from "axios";
import { Avatar, Button } from "flowbite-react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next/types";

const Home: NextPage<PageProps> = ({ twitchConnection }) => {
  const { data: session } = useSession();

  const addModerator = async () => {
    const response = await axios
      .post("/api/np-bot", {
        userId: twitchConnection?.id,
        userDiscordId: session?.user.id,
      })
      .catch(error => {
        alert(error.response.data.error);
      });

    console.info(response);

    if (response) {
      alert("Successfully connected to bot.");
    }
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen relative dark:bg-gray-900">
        <div className="flex flex-col space-y-6">
          <Avatar
            img={session.user.image}
            rounded={true}
            bordered={true}
            size="lg"
          >
            <div className="space-y-1 font-medium dark:text-white">
              <p>{session?.user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Discord Id: {session?.user.id}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Twitch Id: {twitchConnection?.id}
              </p>
              <div className="mt-4">
                <Button size="sm" onClick={addModerator}>
                  Link to Bot
                </Button>
              </div>
            </div>
          </Avatar>
        </div>
        <div className="absolute top-6 right-8">
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
        <Link href="/streamers">Streamer</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen dark:bg-gray-900">
      <Button onClick={() => signIn("discord")}>Sign in Discord</Button>
      <Link href="/streamers">Streamer</Link>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const response = await getUserTwitchConnection(session?.accessToken || "");

  const twitchConnection = response.find(
    (connection: any) => connection.type === "twitch",
  );

  return {
    props: {
      session,
      twitchConnection,
    },
  };
};

interface PageProps {
  twitchConnection: {
    type: string;
    id: string;
    name: string;
    visibility: number;
    friend_sync: boolean;
    show_activity: boolean;
    verified: boolean;
    two_way_link: boolean;
  };
}
