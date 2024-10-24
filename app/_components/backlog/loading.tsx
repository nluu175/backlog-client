import { Loader2 } from "lucide-react";

export default function Loading() {
  // Create an array of 20 items to match PAGE_SIZE
  const skeletonCards = Array(20).fill(null);

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Skeleton Grid */}
      <div className="w-[95%] mx-auto flex-grow grid grid-cols-4 gap-12 p-8 overflow-y-auto">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="relative w-full aspect-[16/9] rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-4 shadow-xl flex items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="text-lg font-medium text-gray-700">
            Loading games...
          </span>
        </div>
      </div>
    </div>
  );
}
