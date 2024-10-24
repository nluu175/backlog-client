import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: PaginationBarProps) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page if we're not starting from 1
    if (startPage > 1) {
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Always show last page if we're not ending at it
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 py-3">
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
        className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium ${
          currentPage === 1 || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title="First Page"
      >
        1
      </button>

      {/* Previous Page */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          currentPage === 1 || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 text-center text-gray-500"
              >
                ⋯
              </span>
            );
          }

          // Don't render if it's the first or last page (they're handled separately)
          if (pageNum === 1 || pageNum === totalPages) {
            return null;
          }

          return (
            <button
              key={index}
              onClick={() => onPageChange(pageNum as number)}
              disabled={isLoading}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 text-sm font-medium
                ${
                  currentPage === pageNum
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          currentPage === totalPages || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title="Next Page"
      >
        <ChevronRight size={20} />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm font-medium ${
          currentPage === totalPages || isLoading
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title="Last Page"
      >
        {totalPages}
      </button>
    </div>
  );
}
