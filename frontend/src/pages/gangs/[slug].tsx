import { getGangData, getGangList } from "@lib/nopixelwiki";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const Gang: NextPage<PageProps> = ({ gangData }) => {
  return (
    <div className="flex flex-col mx-auto w-full h-full dark:bg-gray-900 overflow-auto">
      <div className="mx-auto my-16">
        {gangData.map(member => (
          <div key={member.title} className="dark:text-gray-400">
            {member.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gang;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gangData = await getGangData(params?.slug as string);

  return {
    props: {
      gangData,
    },
    revalidate: 86400,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  const gangs = await getGangList();

  gangs.forEach(gang => {
    return paths.push({
      params: {
        slug: gang.link.slice(6),
      },
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

interface PageProps {
  gangData: any[];
}
