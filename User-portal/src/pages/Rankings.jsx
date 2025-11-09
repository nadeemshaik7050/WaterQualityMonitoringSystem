import React from "react";
import Table from "@/Components/Dashboard/Table";
import { useQuery } from "react-query";
import { rankingsApi } from "@/api/rankings";
import { useUser } from "@/Context/UserContext";

const Rankings = () => {
  const { currentUserDetails } = useUser(); // 

  // 🔹 Fetch rankings data
  const { data, isLoading, error } = useQuery({
    queryKey: ["rankings"],
    queryFn: rankingsApi.getAll,
  });

  // 🔹 Prepare table data
  const tableDataRankings =
    data?.result?.map((user, index) => ({
      rank: index + 1,
      username: user.userName || "NA",
      points: user.totalPoints ?? 0,
      numberOfReviewsGiven: user.numberOfReviewsGiven ?? 0,
    })) || [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading rankings</div>
      </div>
    );

  return (
    <div className="mt-10 p-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full dark:from-blue-400 dark:to-blue-600"></div>
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white tracking-tight">
          🏆 User Rankings&nbsp;
          <span className="text-blue-600 dark:text-blue-400">
            – Water Quality Monitoring
          </span>
        </h1>
      </div>

      {/*   Pass current user's name for highlighting */}
      <Table
        data={tableDataRankings}
        keyType="rankings"
        currentUserName={currentUserDetails?.userName || currentUserDetails?.username || currentUserDetails?.name}
      />
    </div>
  );
};

export default Rankings;