import Image from "next/image";

import { useContext } from "react";

import { BacklogInfo } from "@/app/_types/types";

import { HomePageContext } from "@/app/_hooks/HomePageContext";

type GameItemCardProps = {
  gameInfo: BacklogInfo;
};

export default function GameItemCard({ gameInfo }: GameItemCardProps) {
  let { ...contextData } = useContext(HomePageContext);
  const { setCurrentGame } = contextData;

  const imageSource = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameInfo.steam_app_id}/capsule_616x353.jpg`;

  return (
    <div
      // border-2 border-x-zinc-950
      className="
                m-3 relative w-[95%] w-min-[800px] h-[200px] 
                transform transition-transform duration-300 hover:scale-[1.1]
                overflow-x-auto
                flex justify-center items-center
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
        //  border-2 border-indigo-900
        width={0}
        height={0}
        sizes="100vw"
        // layout="fill"
        // objectFit="contain"
        style={{ width: "100%", height: "auto", position: "relative" }} // optional
      />
      {/* {gameInfo.name} */}
    </div>
  );
}
