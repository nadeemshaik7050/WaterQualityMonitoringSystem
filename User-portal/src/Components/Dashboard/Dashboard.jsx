import React from "react";
import UserCard from "./UserCard";
import BadgesCard from "./BadgesCard";
import Table from "./Table";
import { useAuth } from "@/lib/keycloak/AuthProvider";
import { useQuery } from "react-query";
import { rankingsApi } from "@/api/rankings";
import { userApi } from "@/api/user";

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user.userId + "user");

  const rewardData = {
    badge: "Silver",
    //rating: 4,
    points: 180,
    badgeImage: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png", // temporary sample image
  };

  const { data: reviewsData } = useQuery({
    queryKey: ["previousReviews", user?.userId],
    queryFn: () => rankingsApi.getPreviousReviews(user?.userId),
    // enabled: !!userInfoFromKeyCloak?.sub,
  });

  const { data: currentUserDetails, isLoading } = useQuery({
    queryKey: ["user", user?.userId],
    queryFn: () => userApi.getById(user?.userId),
  });

  const tableDataReviews =
    reviewsData?.result?.map((item) => ({
      // SubmissionID: item.submissionId,
      PostalCode: item.waterQualityData?.postalCode ?? "N/A",
      Value: item.waterQualityData?.measurements?.value ?? "N/A",
      Unit: item.waterQualityData?.measurements?.unit ?? "N/A",
      Observations: item.waterQualityData?.observations ?? "N/A",
      pointsEarned: item.pointsAwarded ?? "N/A",
      CreatedOn: new Date(
        item.waterQualityData?.creationDate
      ).toLocaleDateString(),
    })) ?? [];

  return (
    <div className="p-6 bg-gradient-to-br to-blue-50 from-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        {/* Vertical accent line */}
        <div className="w-1 h-10 bg-blue-600 rounded-full dark:bg-blue-400"></div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white tracking-tight">
          Citizen Dashboard&nbsp;
          <span className="text-blue-600 dark:text-blue-400">
            – Water Quality Monitoring
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserCard user={user} currentUserDetails={currentUserDetails} />
        <BadgesCard user={user} currentUserDetails={currentUserDetails} />
      </div>
      <div className="flex items-center gap-3 mb-3 mt-6">
        {/* Vertical accent line */}
        <div className="w-1 h-10 bg-blue-600 rounded-full dark:bg-blue-400"></div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-blue-900 dark:text-white tracking-tight">
          &nbsp;
          <span className="text-blue-600 dark:text-blue-400">
            Previous reviews
          </span>
        </h1>
      </div>
      <Table
        data={tableDataReviews}
        title="Previous Water Quality Reviews"
        keyType="reviews"
      />
    </div>
  );
};

export default Dashboard;
