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

function DefaultGameDetail() {
  return (
    <div className="w-[90%] mx-auto overflow-hidden rounded-xl bg-gray-900 text-gray-100 shadow-xl min-h-[300px] md:min-h-[400px] flex items-center justify-center">
      <div className="text-center p-4 md:p-8">
        <GamepadIcon size={48} className="text-gray-600 mx-auto mb-4 md:mb-6 md:h-16 md:w-16" />
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">No Game Selected</h2>
        <p className="text-gray-400 text-base md:text-lg">
          Click on a game card to view its details
        </p>
      </div>
    </div>
  );
}

export default function GameDetail() {
  const { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const [imageError, setImageError] = useState(false);
  const [rating, setRating] = useState(currentGame.rating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const imageCardSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/capsule_616x353.jpg`;
  const storeAddress = `https://store.steampowered.com/app/${currentGame.steam_app_id}/`;

  useEffect(() => {
    setImageError(false);
    setRating(currentGame.rating);
  }, [currentGame.steam_app_id, currentGame.rating]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleStarClick = async (selectedRating: number) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/backlogs/${currentGame.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: selectedRating.toString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update rating: ${response.statusText}`);
      }

      setRating(selectedRating);
    } catch (error) {
      setUpdateError(
        error instanceof Error ? error.message : "Failed to update rating"
      );
      setRating(currentGame.rating);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStarHover = (hoveredValue: number) => {
    setHoveredRating(hoveredValue);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  // Wrapper component to center the content
  return (
    <div className="h-full flex items-center">
      {currentGame.steam_app_id === -1 ? (
        <DefaultGameDetail />
      ) : (
        <div className="w-[95%] md:w-[90%] mx-auto overflow-hidden rounded-xl bg-gray-900 text-gray-100 shadow-xl">
          <div className="relative w-full h-40 sm:h-48 md:h-64">
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
                  <GamepadIcon size={48} className="text-gray-600 mb-2 md:mb-4" />
                  <h3 className="text-gray-300 font-medium text-lg md:text-xl mb-2 line-clamp-1 px-4">
                    {currentGame.name}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base">Image not available</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white truncate">
                {currentGame.name}
              </h2>
              <div className="flex items-center" onMouseLeave={handleMouseLeave}>
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  const isHovered = starValue <= hoveredRating;
                  const isRated = starValue <= rating;
                  const displayRating = hoveredRating || rating;

                  return (
                    <Star
                      key={index}
                      size={20}
                      className={`
                        ${getRatingColor(displayRating)}
                        ${isUpdating ? "opacity-50 pointer-events-none" : "cursor-pointer"}
                        transition-colors duration-200 hover:scale-110
                        md:h-6 md:w-6
                      `}
                      fill={isHovered || isRated ? "currentColor" : "none"}
                      onClick={() => !isUpdating && handleStarClick(starValue)}
                      onMouseEnter={() => handleStarHover(starValue)}
                    />
                  );
                })}
              </div>

              {updateError && (
                <div className="mt-2 p-2 md:p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
                  <p className="text-red-500 text-xs md:text-sm">{updateError}</p>
                </div>
              )}
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-gray-700 text-gray-100">
                  {convertPlayTime(currentGame.playtime)}
                </span>
                <span className="px-3 md:px-4 py-1 text-xs md:text-sm rounded-full bg-gray-700 text-gray-100">
                  Rating: {rating}/5
                </span>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 hidden sm:block">
                This is a placeholder description
              </p>

              <Link
                href={storeAddress}
                className="block w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  type="button"
                  className="w-full px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 
                           text-white text-sm md:text-base font-medium rounded-lg transition-colors
                           duration-200 flex items-center justify-center gap-2"
                >
                  View on Steam
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}