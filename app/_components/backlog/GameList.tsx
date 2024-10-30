"use client";
import useSWR from "swr";
import { useContext, useState, useEffect } from "react";
import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import GameItemCard from "./GameItemCard";
import { Search } from "lucide-react";
import Loading from "./loading";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationBar from "./PaginationBar";

// TODO: Move this to enum
// page config
const PAGE_SIZE = 16;

const GameList = () => {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame, setCurrentGame } = contextData;
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get page from URL or default to 1
  const urlPage = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(
    urlPage ? parseInt(urlPage) : 1
  );

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const requestUrl = `http://127.0.0.1:8000/api/backlogs/?page=${currentPage}&size=${PAGE_SIZE}`;

  const { data, error, isLoading } = useSWR(requestUrl, fetcher);

  // Handle transition effects when page changes
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    setCurrentPage(page);
  };

  // TODO: See if we can use nextjs loading function
  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;

  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="w-full">
        <div className="w-[95%] mx-auto py-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white placeholder-gray-400 
                         rounded-xl border border-gray-700 focus:border-indigo-500 focus:ring-2 
                         focus:ring-indigo-500 focus:ring-opacity-20 focus:outline-none
                         transition-all duration-200 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400
                           hover:text-gray-300 transition-colors duration-200"
                >
                  <span className="sr-only">Clear search</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Cards Container */}
      <div className="w-[95%] mx-auto flex-grow overflow-y-auto px-4">
        <div
          className={`
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 py-4
            transition-all duration-300 transform
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }
            ${isLoading ? "pointer-events-none" : ""}
          `}
        >
          {data.results.map((backlog: BacklogInfo) => (
            <div key={backlog.id} className="flex justify-center">
              <GameItemCard gameInfo={backlog} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GameList;
