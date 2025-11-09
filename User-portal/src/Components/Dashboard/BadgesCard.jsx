import React from "react";
import ProgressBar from "../Global/ProgressBar";
import { Award } from "lucide-react";
import { rankingsApi } from "@/api/rankings";
import { useQuery } from "react-query";

const BadgesCard = ({ user, currentUserDetails }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userRating", user?.userId],
    queryFn: () => rankingsApi.getUserRatings(user?.userId),
    //enabled: !!user?.userId,
  });

  const badgeData = data?.result;
  const maxPoints = badgeData?.maxPoints ?? 1500;

  if (isLoading)
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow">
        <p className="text-gray-500 dark:text-gray-300 animate-pulse">
          Loading badge details...
        </p>
      </div>
    );

  // Handle when result is null or API returned error message gracefully
  if (!badgeData || data?.errorMessage) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center transition-all duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-xl px-4 py-3 mb-4 shadow-md flex items-center gap-2 w-full justify-center">
          <Award className="w-5 h-5" />
          <h2 className="text-lg font-semibold tracking-wide">Badges & Rewards</h2>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shadow-inner">
            <Award className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            You haven’t earned any badges yet.  
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Keep submitting reviews to unlock your first badge!
          </p>
        </div>

        <div className="w-full space-y-2 mt-3">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center">
            {currentUserDetails?.points ?? 0} / {maxPoints} Points
          </p>
          <ProgressBar current={currentUserDetails?.points ?? 0} max={maxPoints} />
        </div>
      </div>
    );
  }

  // Default (badge found)
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-xl px-4 py-3 mb-4 shadow-md flex items-center gap-2 w-full">
        <Award className="w-5 h-5" />
        <h2 className="text-lg font-semibold tracking-wide">Badges & Rewards</h2>
      </div>

      {/* Badge Image */}
      <div className="flex justify-center items-center mt-4 mb-2">
        {badgeData?.image?.data ? (
          <div className="relative flex justify-center items-center w-28 h-28">
            <img
              src={`data:image/png;base64,${badgeData.image.data}`}
              alt={badgeData.name || "Reward Badge"}
              className="w-24 h-24 object-cover rounded-full drop-shadow-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 blur-2xl bg-blue-400/20 rounded-full -z-10"></div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No badge image
          </p>
        )}
      </div>

      {/* Badge Name */}
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center mt-2">
        {badgeData?.name || "NA"}
      </p>

      {/* Progress */}
      <div className="w-full space-y-2 mt-3">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center">
          {(currentUserDetails?.points ?? 0)} / {maxPoints} Points
        </p>
        <ProgressBar current={currentUserDetails?.points ?? 0} max={maxPoints} />
      </div>
    </div>
  );
};

export default BadgesCard;
