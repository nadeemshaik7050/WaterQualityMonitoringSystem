import React, { useState } from "react";
import ReviewDetailsModal from "./ReviewDetailsModal";
import { Inbox } from "lucide-react";

const ReviewsTable = ({ reviewsData, reviewsisLoading }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Handle loading state
  if (reviewsisLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading Reviews...
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-sm">
          Please wait while we fetch your recent review activity.
        </p>
      </div>
    );
  }

  const tableData =
    reviewsData?.result?.map((item) => ({
      submissionId: item.submissionId,
      PostalCode: item.waterQualityData?.postalCode ?? "N/A",
      Value: item.waterQualityData?.measurements?.value ?? "N/A",
      Unit: item.waterQualityData?.measurements?.unit ?? "N/A",
      Observations: item.waterQualityData?.observations ?? "N/A",
      Points: item.pointsAwarded ?? "N/A",
      CreatedOn: item.waterQualityData?.creationDate
        ? new Date(item.waterQualityData.creationDate).toLocaleDateString()
        : "N/A",
      Binaries: item.waterQualityData?.binaries ?? [],
    })) ?? [];

  // Empty state
  if (!tableData.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-full mb-4">
          <Inbox className="w-10 h-10 text-blue-600 dark:text-blue-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          No Reviews Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-sm">
          You haven’t reviewed any water quality submissions yet. Once you start reviewing,
          they’ll appear here.
        </p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md transition-all duration-300">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800">
            <tr>
              {Object.keys(tableData[0]).map(
                (key) =>
                  key !== "Binaries" && (
                    <th
                      key={key}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </th>
                  )
              )}
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className={`transition duration-200 ${
                  idx % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-900/30"
                    : "bg-gray-100 dark:bg-gray-800/30"
                } hover:bg-blue-50 dark:hover:bg-gray-700`}
              >
                {Object.entries(row).map(
                  ([key, val], i) =>
                    key !== "Binaries" && (
                      <td
                        key={i}
                        className="px-5 py-3 whitespace-nowrap text-sm border-b border-gray-200 dark:border-gray-700"
                      >
                        {val}
                      </td>
                    )
                )}
                <td className="px-5 py-3 whitespace-nowrap text-sm border-b border-gray-200 dark:border-gray-700">
                  <span
                    onClick={() => setSelectedReview(row)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium text-sm transition-all"
                  >
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed"
              : "text-blue-600 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-blue-600"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed"
              : "text-blue-600 border-blue-300 hover:bg-blue-100 dark:text-blue-400 dark:border-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </>
  );
};

export default ReviewsTable;
