import React, { useState } from "react";
import { FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiLaurelCrown } from "react-icons/gi";

const Table = ({ data, title, currentUserName }) => {
  if (!data || data.length === 0) return null;

  const currentUserStyle =
    "bg-yellow-300 text-black font-semibold shadow-inner shadow-yellow-600 border border-yellow-400";

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Rank icon logic: prefer row.rank, else computed rank
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <GiLaurelCrown className="text-yellow-400 text-lg mx-auto" title="1st" />;
      case 2:
        return <GiLaurelCrown className="text-gray-400 text-lg mx-auto" title="2nd" />;
      case 3:
        return <GiLaurelCrown className="text-amber-700 text-lg mx-auto" title="3rd" />;
      default:
        return <span className="font-semibold">{rank}</span>;
    }
  };

  // Build list of column keys but exclude 'rank' (case-insensitive)
  const allKeys = Object.keys(data[0] || {});
  const columnKeys = allKeys.filter((k) => k.toLowerCase() !== "rank");

  return (
    <div className="mt-10">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-200 border-b border-blue-200 dark:border-gray-700 pb-2 flex items-center gap-2">
          {title}
        </h2>
      )}

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300">
        <table className="min-w-full border-collapse text-sm">
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-300 dark:border-gray-700 w-16 text-center">
                Rank
              </th>

              {columnKeys.map((key) => (
                <th
                  key={key}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-300 text-white dark:border-gray-700 dark:text-gray-200"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginatedData.map((row, idx) => {
              // absolute rank: if row.rank provided use it, else compute from index
              const computedIndex = (currentPage - 1) * rowsPerPage + idx + 1;
              const rowRank =
                typeof row.rank === "number" && !Number.isNaN(row.rank)
                  ? row.rank
                  : computedIndex;

              const isCurrentUser =
                currentUserName &&
                (row.username || row.userName || "").toString().toLowerCase() ===
                  currentUserName.toLowerCase();

              const rowClass = isCurrentUser
                ? currentUserStyle
                : computedIndex % 2 === 0
                ? "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200"
                : "bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100";

              return (
                <tr
                  key={row.submissionId ?? row.id ?? idx}
                  className={`transition duration-200 ${rowClass} hover:bg-blue-50 dark:hover:bg-gray-600`}
                >
                  {/* Rank cell (single source of truth) */}
                  <td className="px-4 py-3 text-center border-b border-gray-200 dark:border-gray-700">
                    {getRankIcon(rowRank)}
                  </td>

                  {/* Data cells (skip any 'rank' field) */}
                  {columnKeys.map((key) => {
                    const val = row[key];
                    return (
                      <td
                        key={key}
                        className="px-5 py-3 whitespace-nowrap border-b border-gray-200 dark:border-gray-700"
                      >
                        {key.toLowerCase() === "username" ? (
                          <span className="flex items-center gap-2">
                            {isCurrentUser && (
                              <FaUser className="text-yellow-700 text-base bg-yellow-200 p-1 rounded-full" />
                            )}
                            {val}
                          </span>
                        ) : (
                          val
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              <FaChevronLeft /> Prev
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
