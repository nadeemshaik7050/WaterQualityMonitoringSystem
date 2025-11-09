const Table = ({ data, title, keyType, currentUserName }) => {
  if (!data || data.length === 0) return null;

  const isRankings = keyType === "rankings";

  return (
    <div className="mt-10">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-200 border-b border-blue-200 dark:border-gray-700 pb-2 flex items-center gap-2">
          {title}
        </h2>
      )}

      <div
        className={`overflow-x-auto rounded-2xl shadow-lg border ${
          isRankings
            ? "border-yellow-400/50 bg-gradient-to-br from-black via-gray-900 to-yellow-900/40"
            : "border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/90"
        } backdrop-blur-md transition-all duration-300`}
      >
        <table className="min-w-full border-collapse">
          <thead
            className={
              isRankings
                ? ""
                : "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800"
            }
          >
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${
                    isRankings
                      ? "text-yellow-300 border-yellow-700/50"
                      : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                  }`}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => {
              const isCurrentUser =
                currentUserName &&
                row.username?.toLowerCase() === currentUserName?.toLowerCase();

              let highlightClass = "";

              if (isRankings) {
                if (isCurrentUser) {
                  highlightClass =
                    "bg-blue-700 text-white font-bold text-base scale-[1.03]";
                }
                //  else if (row.rank === 1) {
                //   highlightClass =
                //     "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold";
                // } else if (row.rank === 2) {
                //   highlightClass =
                //     "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black";
                // } else if (row.rank === 3) {
                //   highlightClass =
                //     "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-black";
                // } else {
                //   highlightClass =
                //     idx % 2 === 0
                //       ? "bg-gray-950/40 text-yellow-100"
                //       : "bg-gray-900/40 text-yellow-200";
                // }
              }

              return (
                <tr
                  key={idx}
                  className={`transition duration-200 ${highlightClass} hover:brightness-110`}
                >
                  {Object.values(row).map((val, i) => (
                    <td
                      key={i}
                      className="px-5 py-3 whitespace-nowrap text-sm border-b border-gray-100 dark:border-gray-700"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

// import React from "react";

// const Table = ({ data, title, keyType }) => {
  
//   if (!data || data.length === 0) return null;

//   const formatHeader = (key) =>
//     key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase())
//       .trim();

//   const isRankings = keyType === "rankings";

//   return (
//     <div className="mt-10">
//       {/* Title */}
//       {title && (
//         <h2 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-200 border-b border-blue-200 dark:border-gray-700 pb-2 flex items-center gap-2">
//           {title}
//         </h2>
//       )}

//       {/* Table Wrapper */}
//       <div
//         className={`overflow-x-auto rounded-2xl shadow-lg border ${
//           isRankings
//             ? "border-yellow-400/50 bg-gradient-to-br from-black via-gray-900 to-yellow-900/40"
//             : "border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/90"
//         } backdrop-blur-md transition-all duration-300`}
//       >
//         <table className="min-w-full border-collapse">
//           {/* Table Head */}
//           <thead
//             className={
//               isRankings
//                 ? "bg-gradient-to-r from-yellow-400/20 via-yellow-300/20 to-yellow-500/10"
//                 : "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-800"
//             }
//           >
//             <tr>
//               {Object.keys(data[0]).map((key) => (
//                 <th
//                   key={key}
//                   className={`px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b ${
//                     isRankings
//                       ? "text-yellow-300 border-yellow-700/50"
//                       : "text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
//                   }`}
//                 >
//                   {formatHeader(key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {data.map((row, idx) => {
//               const rank = row.rank;
//               let highlightClass = "";

//               if (isRankings) {
//                 // Elite gradient styles for top 3
//                 if (rank === 1) {
//                   highlightClass =
//                     "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold text-lg scale-[1.04]";
//                 } else if (rank === 2) {
//                   highlightClass =
//                     "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-semibold text-base scale-[1.02]";
//                 } else if (rank === 3) {
//                   highlightClass =
//                     "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-black font-medium text-sm scale-[1.01]";
//                 } else {
//                   highlightClass =
//                     idx % 2 === 0
//                       ? "bg-gray-950/40 text-yellow-100"
//                       : "bg-gray-900/40 text-yellow-200";
//                 }
//               } else {
//                 // Normal table look
//                 highlightClass =
//                   idx % 2 === 0
//                     ? "bg-white/70 dark:bg-gray-800"
//                     : "bg-blue-50/60 dark:bg-gray-700/50";
//               }

//               return (
//                 <tr
//                   key={idx}
//                   className={`transition duration-200 ${highlightClass} hover:brightness-110`}
//                 >
//                   {Object.values(row).map((val, i) => (
//                     <td
//                       key={i}
//                       className="px-5 py-3 whitespace-nowrap text-sm border-b border-gray-100 dark:border-gray-700"
//                     >
//                       {val}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;
