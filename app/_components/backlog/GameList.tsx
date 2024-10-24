"use client";

import useSWR from "swr";
import { useContext, useState } from "react";
import { BacklogInfo } from "@/app/_types/types";
import { HomePageContext } from "@/app/_hooks/HomePageContext";
import GameItemCard from "./GameItemCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "./loading";

export default function GameList() {
  let { ...contextData } = useContext(HomePageContext);
  const { currentGame, setCurrentGame } = contextData;
  const [currentPage, setCurrentPage] = useState(1);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // page config
  // TODO: MOVE THIS TO ENUM
  const PAGE_SIZE = 20;

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
      <div className="w-[95%] mx-auto flex-grow grid grid-cols-4 gap-12 p-8 overflow-y-auto">
        {data.results.map((backlog: BacklogInfo) => (
          <GameItemCard key={backlog.id} gameInfo={backlog} />
        ))}
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
