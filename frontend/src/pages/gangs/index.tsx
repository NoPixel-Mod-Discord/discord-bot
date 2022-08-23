import { getGangList } from "@lib/nopixelwiki";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

const Gangs: NextPage<PageProps> = ({ gangData }) => {
  return (
    <div className="flex flex-col mx-auto w-full h-full dark:bg-gray-900 overflow-auto">
      <div className="mx-auto my-16">
        {gangData.map((gang, index) => (
          <Link
            href={`https://nopixel.fandom.com/wiki/${gang.link.slice(6)}`}
            key={index}
          >
            <a className="flex gap-4">
              <span className="dark:text-gray-400">{index + 1}.</span>{" "}
              <span className="dark:text-white">{gang.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gangs;

export const getStaticProps: GetStaticProps = async () => {
  const gangData = await getGangList();

  return {
    props: {
      gangData,
    },
    revalidate: 86400,
  };
};

interface PageProps {
  gangData: {
    name: string;
    link: string;
  }[];
}
