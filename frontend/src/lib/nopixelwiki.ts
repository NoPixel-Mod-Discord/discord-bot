import { parse } from "node-html-parser";

export const getGangList = async (): Promise<
  {
    name: string;
    link: string;
  }[]
> => {
  const response = await fetch(
    "https://nopixel.fandom.com/wiki/Category:Active_Gangs",
  ).then(res => res.text());

  const data = parse(response || "");
  const list = data.querySelectorAll(".category-page__member");

  const activeGang = list.map((tag: any) => {
    const info = Object.assign(
      {},
      tag.childNodes
        .map((node: any) => node._attrs)
        .filter((node: any) => node !== undefined),
    );

    const gangData: {
      name: string;
      link: string;
    } = {
      name: info[1].title,
      link: info[1].href,
    };

    return gangData;
  });

  return activeGang;
};

export const getGangData = async (name: string) => {
  const response = await fetch(`https://nopixel.fandom.com/wiki/${name}`).then(
    res => res.text(),
  );

  const data = parse(response || "");
  const list = data.querySelectorAll(".pi-data-value");

  const gangData = list.map((tag: any) => {
    const node = tag.childNodes.find(
      (tag: any) => (tag.rawTagName = "a"),
    )._attrs;

    return node;
  });

  const filteredData = gangData.filter((tag: any) => tag !== null || undefined);

  return filteredData.slice(8);
};
