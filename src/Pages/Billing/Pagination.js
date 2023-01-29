import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const Pagination = ({ count, setCurrentPage, currentPage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(count / 10); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="flex items-center justify-between rounded-xl px-2 py-4">
      <div className="flex flex-1 items-center justify-center sm:justify-between">
        <div>
          <p className="hidden sm:block text-base text-gray-50">
            Total Billings: <span className="font-medium">{count}</span> |
            Current Page:
            <span className="font-medium"> {currentPage}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-800/50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-500/50 transition-all duration-300 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumber.map((number, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(number)}
                aria-current="page"
                className="relative z-10 inline-flex items-center border border-gray-50 bg-gray-500/80 px-4 py-2 text-sm font-medium text-gray-50 focus:z-20"
              >
                {number}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageNumber.length}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-gray-800/50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-500/50 transition-all duration-300 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
