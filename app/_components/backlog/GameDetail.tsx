import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import { Star, GamepadIcon } from "lucide-react";

function convertPlayTime(playTime: number): string {
  const playTimeConverted: number = Math.round(playTime / 60);
  if (playTimeConverted === 0) {
    return `${playTime} minutes`;
  }
  return `${playTimeConverted} hours`;
}

function getRatingColor(rating: number): string {
  if (rating >= 4) return "text-green-500";
  if (rating >= 3) return "text-yellow-500";
  return "text-red-500";
}

export default function GameDetail() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const [imageError, setImageError] = useState(false);

  const imageSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/hero_capsule.jpg`;
  const storeAddress = `https://store.steampowered.com/app/${currentGame.steam_app_id}/`;
  const imageCardSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/capsule_616x353.jpg`;

  useEffect(() => {
    setImageError(false);
  }, [currentGame.steam_app_id]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-[90%] mx-auto my-4 overflow-hidden rounded-xl bg-gray-900 text-gray-100 shadow-xl">
      <div className="relative w-full h-64">
        {!imageError ? (
          <Image
            className="rounded-t-xl"
            alt={currentGame.name}
            src={imageCardSrc}
            fill
            onError={handleImageError}
            priority
            style={{ objectFit: "cover" }}
            key={currentGame.steam_app_id}
          />
        ) : (
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-xl flex flex-col items-center justify-center">
              <GamepadIcon size={64} className="text-gray-600 mb-4" />
              <h3 className="text-gray-300 font-medium text-xl mb-2 line-clamp-1 px-4">
                {currentGame.name}
              </h3>
              <p className="text-gray-500 text-base">
                Image not available
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white truncate">
            {currentGame.name}
          </h2>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={24}
                className={`${
                  index < Math.round(currentGame.rating)
                    ? getRatingColor(currentGame.rating)
                    : "text-gray-600"
                }`}
                fill={
                  index < Math.round(currentGame.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="px-4 py-1 text-sm rounded-full bg-gray-700 text-gray-100">
              {convertPlayTime(currentGame.playtime)}
            </span>
            <span className="px-4 py-1 text-sm rounded-full bg-gray-700 text-gray-100">
              Rating: {currentGame.rating}/5
            </span>
          </div>

          <p className="text-gray-300 text-base leading-relaxed line-clamp-3">
            Experience this incredible game that has captured the hearts of
            players worldwide. Dive into an immersive world of adventure and
            challenge.
          </p>

          <Link
            href={storeAddress}
            className="block w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 
                         text-white text-base font-medium rounded-lg transition-colors
                         duration-200 flex items-center justify-center gap-2"
            >
              View on Steam
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}