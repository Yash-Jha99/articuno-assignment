import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage = 1, onPageChange }: Props) => {
  const array = Array.from({ length: totalPages }).fill(0);
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="rounded-l-lg border border-gray-300 px-3  py-2 leading-tight text-gray-200 hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600 dark:border-gray-700  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {array.map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onPageChange(index + 1)}
              className="ml-0  border border-gray-300 px-3  py-2 leading-tight text-gray-200 hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600 dark:border-gray-700  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="rounded-r-lg border border-gray-300 px-3  py-2 leading-tight text-gray-200 hover:bg-gray-100 hover:text-gray-700 disabled:text-gray-600 disabled:hover:bg-transparent disabled:hover:text-gray-600 dark:border-gray-700  dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
