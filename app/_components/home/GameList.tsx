import useSWR from "swr";

import Image from "next/image";

import { useContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

import { HomePageContext } from "@/app/_hooks/HomePageContext";

type GameItemCardProps = {
  gameInfo: BacklogInfo;
};

function GameItemCard({ gameInfo }: GameItemCardProps) {
  let { ...contextData } = useContext(HomePageContext);
  const { setCurrentGame } = contextData;

  const imageSource = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameInfo.steam_app_id}/capsule_616x353.jpg`;

  return (
    <div
      // border-2 border-x-zinc-950
      className="
                m-3 relative w-[95%] h-[200px] w-min-[800px]
                transform transition-transform duration-300 hover:scale-105
                overflow-x-auto
                flex flex-col justify-center items-center
                "
      key={gameInfo.name}
      onClick={() => {
        setCurrentGame(gameInfo);
      }}
    >
      <Image
        src={imageSource}
        alt="Game Thumbnail"
        className="h-auto max-w-full rounded-lg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
      />
      {/* {gameInfo.name} */}
    </div>
  );
}

export default function GameList() {
  let { ...contextData } = useContext(HomePageContext);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // page config
  const PAGE_NUMBER = 10;
  const PAGE_SIZE = 16;

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

  return (
    <div
      className="w-[60%] m-1
                grid grid-cols-4 grid-flow-row gap-4 
                overflow-y-auto
                "
    >
      {data.results.map((backlog: BacklogInfo) => (
        <GameItemCard key={backlog.id} gameInfo={backlog} />
      ))}
    </div>
  );
}
