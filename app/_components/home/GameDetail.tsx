import Image from "next/image";
import Link from "next/link";

import { useContext, useState } from "react";

import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";

export default function GameDetail() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const imageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/hero_capsule.jpg`;

  const fallbackImageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/730/hero_capsule.jpg`;

  const shopAddress = `https://store.steampowered.com/app/${currentGame.steam_app_id}/`;

  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="
                w-[40%] m-1 pt-4
                flex flex-col justify-start items-center
                "
    >
      {/* TODO: Placeholder Image for not fetchable images */}
      <div className="m-2">
        {/* TODO: The problem here is Image is not always rendered */}
        <Image
          className="h-auto max-w-full rounded-lg"
          alt={currentGame.name}
          src={hasError ? fallbackImageSrc : imageSrc}
          width={400}
          height={400}
          objectFit="cover"
          onError={() => setHasError(true)}
          onLoad={(event) => {
            console.log("hehe");
          }}
        />
      </div>
      <div className="m-2">
        <h5 className="mb-2 text-xl font-bold tracking-tight">
          {currentGame.name}
        </h5>
      </div>
      <div>
        <Link href={shopAddress}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Go To Steam Page
          </button>
        </Link>
      </div>
    </div>
  );
}
