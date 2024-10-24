"use client";

import useSWR from "swr";
import { useContext, useState } from "react";
import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import GameItemCard from "./GameItemCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Loading from "./loading";

export default function GameList() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame, setCurrentGame } = contextData;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // page config
  // TODO: MOVE THIS TO ENUM
  const PAGE_SIZE = 16;

  const requestUrl = `http://127.0.0.1:8000/api/backlogs/?page=${currentPage}&size=${PAGE_SIZE}`;

  const { data, error, isLoading } = useSWR(requestUrl, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;
  if (!data) return <Loading />;

  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 py-4">
          {data.results.map((backlog: BacklogInfo) => (
            <div key={backlog.id} className="flex justify-center">
              <GameItemCard gameInfo={backlog} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2 py-4 rounded-lg mx-4 p-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || isLoading}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            currentPage === 1 || isLoading
              ? "bg-indigo-200 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                currentPage === pageNum
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white hover:bg-indigo-100 text-indigo-600 border border-indigo-200"
              } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            currentPage === totalPages || isLoading
              ? "bg-indigo-200 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <ChevronRight size={20} />
        </button>

        <span className="text-sm font-medium text-indigo-800 bg-white px-4 py-2 rounded-lg shadow-sm border border-indigo-100">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
