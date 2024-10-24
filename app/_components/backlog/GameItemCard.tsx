import Image from "next/image";
import { useContext, useState } from "react";
import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import { GamepadIcon } from "lucide-react";

type GameItemCardProps = {
  gameInfo: BacklogInfo;
};

export default function GameItemCard({ gameInfo }: GameItemCardProps) {
  let { ...contextData } = useContext(HomePageContext);
  const { setCurrentGame } = contextData;
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageSource = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameInfo.steam_app_id}/capsule_616x353.jpg`;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`
        relative w-full
        transform transition-all duration-500 ease-in-out
        ${isHovered ? "scale-105" : "scale-100"}
        overflow-hidden
        rounded-lg cursor-pointer
        shadow-lg hover:shadow-2xl
        group
        aspect-[16/9]
      `}
      key={gameInfo.name}
      onClick={() => setCurrentGame(gameInfo)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!imageError ? (
        <>
          <Image
            src={imageSource}
            alt={gameInfo.name}
            className={`
              w-full h-full
              transition-all duration-500 ease-in-out
              ${isHovered ? "scale-110" : "scale-100"}
            `}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={handleImageError}
            priority
          />
          <div
            className={`
            absolute inset-0 
            bg-gradient-to-t from-black/70 via-black/20 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            flex flex-col justify-end
            p-4
          `}
          >
            <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {gameInfo.name}
            </h3>
            <p className="text-gray-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              Click to view details
            </p>
          </div>
        </>
      ) : (
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br from-gray-800 to-gray-900 
            flex flex-col items-center justify-center p-4 
            transition-all duration-500
            ${isHovered ? "bg-gradient-to-br from-gray-700 to-gray-800" : ""}
          `}
        >
          <GamepadIcon
            size={48}
            className={`
              text-gray-600 mb-2
              transition-transform duration-500
              ${isHovered ? "scale-110" : "scale-100"}
            `}
          />
          <div className="text-center">
            <h3 className="text-gray-300 font-medium text-lg mb-1 line-clamp-1">
              {gameInfo.name}
            </h3>
            <p
              className={`
              text-gray-500 text-sm
              transition-opacity duration-500
              ${isHovered ? "opacity-100" : "opacity-75"}
            `}
            >
              Image not available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
