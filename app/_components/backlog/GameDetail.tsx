import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import {
  Star,
  GamepadIcon,
  Heart,
  CheckCircle,
  Edit,
  Clock,
} from "lucide-react";

// Utility functions
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

// Badge component for favorite and completed status
const StatusBadge = ({
  active,
  icon: Icon,
  label,
  onClick,
  isUpdating,
}: {
  active?: boolean;
  icon: typeof Heart | typeof CheckCircle | typeof Clock;
  label: string;
  onClick?: () => void;
  isUpdating: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isUpdating}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        transition-all duration-200 
        ${
          active
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }
        ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <Icon size={16} className={active ? "fill-current" : ""} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const CommentSection = ({
  comment,
  onSave,
  isUpdating,
}: {
  comment: string;
  onSave: (newComment: string) => void;
  isUpdating: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleSave = () => {
    onSave(editedComment);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedComment(comment);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-gray-100 rounded-lg 
                   border border-gray-700 focus:border-blue-500 focus:ring-1 
                   focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="Add your comment..."
          disabled={isUpdating}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white 
                     text-sm rounded-lg transition-colors duration-200"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 
                     text-sm rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <p className="text-gray-300 text-sm leading-relaxed min-h-[3em]">
        {comment || "No comment added yet"}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        disabled={isUpdating}
        className="absolute top-0 right-0 p-1.5 rounded-lg opacity-0 
                 group-hover:opacity-100 transition-opacity duration-200
                 hover:bg-gray-700"
      >
        <Edit size={16} className="text-gray-400" />
      </button>
    </div>
  );
};

const DefaultGameDetail = () => {
  // DefaultGameDetail component remains the same
  return (
    <div className="w-[90%] mx-auto overflow-hidden rounded-xl bg-gray-900 text-gray-100 shadow-xl min-h-[300px] md:min-h-[400px] flex items-center justify-center">
      <div className="text-center p-4 md:p-8">
        <GamepadIcon
          size={48}
          className="text-gray-600 mx-auto mb-4 md:mb-6 md:h-16 md:w-16"
        />
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
          No Game Selected
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Click on a game card to view its details
        </p>
      </div>
    </div>
  );
};

const GameDetail = () => {
  const { ...contextData } = useContext(HomePageContext);
  const { currentGame } = contextData;

  const [imageError, setImageError] = useState(false);
  const [rating, setRating] = useState(currentGame.rating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(currentGame.favourite);
  const [isCompleted, setIsCompleted] = useState(currentGame.completed);
  const [comment, setComment] = useState(currentGame.comment);

  const imageCardSrc = `https://cdn.cloudflare.steamstatic.com/steam/apps/${currentGame.steam_app_id}/capsule_616x353.jpg`;
  const storeAddress = `https://store.steampowered.com/app/${currentGame.steam_app_id}/`;

  useEffect(() => {
    setImageError(false);
    setRating(currentGame.rating);
    setIsFavorite(currentGame.favourite);
    setIsCompleted(currentGame.completed);
    setComment(currentGame.comment);
  }, [currentGame]);

  const updateGame = async (updates: Partial<typeof currentGame>) => {
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
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update game: ${response.statusText}`);
      }
    } catch (error) {
      setUpdateError(
        error instanceof Error ? error.message : "Failed to update game"
      );
      // Revert state on error
      setRating(currentGame.rating);
      setIsFavorite(currentGame.favourite);
      setIsCompleted(currentGame.completed);
      setComment(currentGame.comment);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    updateGame({ rating: selectedRating });
  };

  const handleFavoriteToggle = () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);
    updateGame({ favourite: newValue });
  };

  const handleCompletedToggle = () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue);
    updateGame({ completed: newValue });
  };

  const handleCommentSave = (newComment: string) => {
    setComment(newComment);
    updateGame({ comment: newComment });
  };

  const handleImageError = () => setImageError(true);
  const handleStarHover = (hoveredValue: number) =>
    setHoveredRating(hoveredValue);
  const handleMouseLeave = () => setHoveredRating(0);

  return (
    <div className="h-full flex items-center">
      {currentGame.steam_app_id === -1 ? (
        <DefaultGameDetail />
      ) : (
        <div className="w-[95%] md:w-[90%] mx-auto overflow-hidden rounded-xl bg-gray-900 text-gray-100 shadow-xl">
          {/* Image */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounxded-t-xl flex flex-col items-center justify-center">
                  <GamepadIcon
                    size={48}
                    className="text-gray-600 mb-2 md:mb-4"
                  />
                  <h3 className="text-gray-300 font-medium text-lg md:text-xl mb-2 line-clamp-1 px-4">
                    {currentGame.name}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base">
                    Image not available
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            {/* Title and Rating section */}
            <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white truncate">
                {currentGame.name}
              </h2>

              {/* Status badges */}
              <div className="flex flex-wrap gap-2">
                <StatusBadge
                  active={isFavorite}
                  icon={Heart}
                  label="Favorite"
                  onClick={handleFavoriteToggle}
                  isUpdating={isUpdating}
                />
                <StatusBadge
                  active={isCompleted}
                  icon={CheckCircle}
                  label="Completed"
                  onClick={handleCompletedToggle}
                  isUpdating={isUpdating}
                />
                <StatusBadge
                  // active={isCompleted}
                  icon={Clock}
                  label={convertPlayTime(currentGame.playtime)}
                  // onClick={handleCompletedToggle}
                  isUpdating={isUpdating}
                />
              </div>

              {/* Rating stars */}
              <div
                className="flex items-center"
                onMouseLeave={handleMouseLeave}
              >
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
                        ${
                          isUpdating
                            ? "opacity-50 pointer-events-none"
                            : "cursor-pointer"
                        }
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
                  <p className="text-red-500 text-xs md:text-sm">
                    {updateError}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Comment section */}
              <div className="bg-gray-800 rounded-lg p-3">
                <CommentSection
                  comment={comment}
                  onSave={handleCommentSave}
                  isUpdating={isUpdating}
                />
              </div>

              {/* Steam link button */}
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
};

export default GameDetail;
