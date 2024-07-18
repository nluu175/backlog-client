import Image from "next/image";
import Link from "next/link";

import { useContext, useState } from "react";

import { HomePageContext } from "@/app/_hooks/HomePageContext";

// TODO: Declare return type

function convertPlayTime(playTime: number): string {
  let playTimeConverted: number = Math.round(playTime / 60);
  if (playTimeConverted === 0) {
    return `${playTime} minutes`;
  } else {
    return `${playTimeConverted} hours`;
  }
}

export default function GameDetail() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const imageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/hero_capsule.jpg`;
  // const imageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/620/hero_capsule.jpg`;
  const fallbackImageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/730/hero_capsule.jpg`;

  // const [url, setUrl] = useState(imageSrc);

  const storeAddress = `https://store.steampowered.com/app/${currentGame.steam_app_id}/`;

  // const [hasError, setHasError] = useState(false);

  return (
    <div
      className="
                w-[40%] m-1 pt-4
                flex flex-col justify-start items-center
                border-2 border-green-50
                "
    >
      {/* TODO: Placeholder Image for not fetchable images */}
      <div className="m-2">
        {/* TODO: The problem here is Image is not always rendered */}

        <Image
          className="h-auto max-w-full w-full rounded-lg"
          // border-4 border-double border-indigo-900
          alt={currentGame.name}
          // src={hasError ? fallbackImageSrc : imageSrc}
          src={imageSrc}
          width={400}
          height={400}
        />
      </div>
      <div className="m-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight">
          {currentGame.name}
        </h5>
      </div>

      <div>
        <Link href={storeAddress}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go To Steam Page
          </button>
        </Link>
      </div>

      <div className="m-2">
        <p className="mb-3 font-normal">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <p>playtime: {convertPlayTime(currentGame.playtime)}</p>
        <p>rating: {currentGame.rating}</p>
      </div>
    </div>
  );
}
