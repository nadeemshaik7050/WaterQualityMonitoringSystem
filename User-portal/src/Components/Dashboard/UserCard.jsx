import React from "react";
import { useNavigate } from "react-router-dom";
const UserCard = ({ user,currentUserDetails }) => {
  
  //   const { userInfoFromKeyCloak } = useAuth();

  //   const { data: user, isLoading } = useQuery({
  //   queryKey: ['user', id],
  //   queryFn: () => userApi.getById(id),
  // });

  console.log(currentUserDetails+"currentUserDetails")

  const navigate = useNavigate()
  return (
  <div className="w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-xl px-4 py-3 mb-6 shadow-md flex items-center justify-between">
      <h3 className="text-lg font-semibold tracking-wide">👤 User Details</h3>
      {/* <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-lg">
        Active
      </span> */}
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Name
        </span>
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
         {user.name || user.username || "N/A"}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Citizen ID
        </span>
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {user.userId || "NA"}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Submissions
        </span>
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {currentUserDetails?.numberOfReviewsGiven | "NA"}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Points
        </span>
        <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {currentUserDetails?.points || "NA"}
        </span>
      </div>
    </div>

    {/* Footer (Optional Reward Info or Action) */}
    <div onClick={() => navigate("/user-profile")} className="mt-6 flex justify-end">
      <button className="px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        View Profile →
      </button>
    </div>
  </div>
);
}

export default UserCard;
