import Image from "next/image";

import { useContext } from "react";

import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";

export default function GameDetail() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const imageSource = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/hero_capsule.jpg`;

  return (
    <div
      className="w-[40%] m-1 pt-4
                    flex flex-col justify-start items-center "
    >
      {/* TODO: Placeholder Image for not fetchable images */}
      <Image
        src={imageSource}
        alt="Game Thumbnail"
        className=""
        width={400}
        height={400}
      />
      {currentGame.name}
    </div>
  );
}
