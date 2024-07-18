import useSWR from "swr";

import Image from "next/image";

import { useContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

import { HomePageContext } from "@/app/_hooks/HomePageContext";

import GameItemCard from "./GameItemCard";

export default function GameList() {
  let { ...contextData } = useContext(HomePageContext);

  const { currentGame, setCurrentGame } = contextData;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // page config
  const PAGE_NUMBER = 10;
  const PAGE_SIZE = 20;

  const requestUrl = `http://127.0.0.1:8000/backlog/backlogs/?page=${PAGE_NUMBER}&size=${PAGE_SIZE}`;

  // Source: https://stackoverflow.com/questions/53963328/how-do-i-get-a-hash-for-a-picture-form-a-steam-game

  // ---------------- Pics Format
  // http://media.steampowered.com/steamcommunity/public/images/apps/{appid}/{hash}.jpg
  // https://cdn.cloudflare.steamstatic.com/steam/apps/1569040/hero_capsule.jpg
  // https://cdn.cloudflare.steamstatic.com/steam/apps/1569040/capsule_616x353.jpg
  // https://cdn.cloudflare.steamstatic.com/steam/apps/1569040/header.jpg
  // https://cdn.cloudflare.steamstatic.com/steam/apps/1569040/capsule_231x87.jpg

  const { data, error, isLoading } = useSWR(requestUrl, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // console.log(data);

  return (
    <div
      className="w-[70%] m-1
                grid grid-cols-4 grid-flow-row gap-1 
                overflow-y-auto
                p-3"
    >
      {data.results.map((backlog: BacklogInfo) => (
        <GameItemCard key={backlog.id} gameInfo={backlog} />
      ))}
    </div>
  );
}
