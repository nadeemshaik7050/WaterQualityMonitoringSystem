import React from "react";

const ProgressBar = ({ current, max }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      {/* Progress Track */}
      <div className="relative bg-gray-200 dark:bg-gray-700 h-7 rounded-full overflow-hidden">
        {/* Animated Fill */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-green-400 to-emerald-500 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
        {/* Glow Effect */}
        <div
          className="absolute left-0 top-0 h-full rounded-full blur-md opacity-40 bg-gradient-to-r from-blue-400 via-green-300 to-emerald-400"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage Text */}
      <div className="text-right mt-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
