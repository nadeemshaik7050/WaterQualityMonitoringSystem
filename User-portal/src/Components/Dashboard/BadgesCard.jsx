import React from "react";
import ProgressBar from "../Global/ProgressBar";
import { Award, Star } from "lucide-react";
import { rankingsApi } from "@/api/rankings";
import { useQuery } from "react-query";//   Correct import

const BadgesCard = ({user,currentUserDetails}) => {
  //let citizenId = "55272a6a-d015-4094-9358-4aa5171c839c";
  //   Fetch user ratings using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["userRating", user?.userId],
    queryFn: () => rankingsApi.getUserRatings(user?.userId),
  });

  console.log(user.userId+"citizenId")


  const badgeData = data?.result; //   Access actual data from API response
  const maxPoints = badgeData?.maxPoints ?? 1500;

  if (isLoading)
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow">
        <p className="text-gray-500 dark:text-gray-300">Loading badge...</p>
      </div>
    );

  if (error)
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow">
        <p className="text-red-500">Failed to load badge info.</p>
      </div>
    );

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-xl px-4 py-3 mb-4 shadow-md flex items-center gap-2 w-full">
        <Award className="w-5 h-5" />
        <h2 className="text-lg font-semibold tracking-wide">
          Badges & Rewards
        </h2>
      </div>

      {/* Badge Image */}
      <div className="flex justify-center items-center mt-4 mb-2">
        {badgeData?.image?.data ? (
          <div className="relative flex justify-center items-center w-28 h-28">
            <img
              src={`data:image/png;base64,${badgeData.image.data}`}
              alt={badgeData.name || "Reward Badge"}
className="w-24 h-24 object-cover rounded-full drop-shadow-lg transition-transform duration-300 hover:scale-110"            />
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

      {/* Rating */}
      {/* <div className="flex items-center justify-center gap-1 text-yellow-500 dark:text-yellow-400 text-sm">
        <Star className="w-4 h-4 fill-yellow-400" />
        <span className="text-gray-700 dark:text-gray-300">
          {(badgeData?.rating ?? 0.0)}/5 Rating
        </span>
      </div> */}

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
