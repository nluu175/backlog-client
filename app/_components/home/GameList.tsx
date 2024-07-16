import useSWR from "swr";

import { useContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

import { HomePageContext } from "@/app/_hooks/HomePageContext";

type GameItemBoxProps = {
  gameInfo: BacklogInfo;
};

function GameItemBox({ gameInfo }: GameItemBoxProps) {
  let { ...contextData } = useContext(HomePageContext);
  const { setCurrentGame } = contextData;
  
  return (
    <div
      className="border-2 border-l-cyan-200 m-3 relative w-[95%] pt-[100%]
                transform transition-transform duration-300 hover:scale-105"
      key={gameInfo.name}
      onClick={() => {
        setCurrentGame(gameInfo);
      }}
    >
      {gameInfo.name}
    </div>
  );
}

export default function GameList() {
  let { ...contextData } = useContext(HomePageContext);
  const { setCurrentGame } = contextData;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // page config
  const PAGE_NUMBER = 1;
  const PAGE_SIZE = 12;

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
                overflow-y-auto"
    >
      {data.results.map((backlog: BacklogInfo) => (
        <GameItemBox key={backlog.id} gameInfo={backlog} />
      ))}
    </div>
  );
}
