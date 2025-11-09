import React from "react";
import { FiLogOut, FiMail, FiUser } from "react-icons/fi";
import KeycloakService from "@/lib/keycloak/service";
import { useAuth } from "@/lib/keycloak/AuthProvider";
import { useQuery } from "react-query";
import { userApi } from "@/api/user";

const UserProfile = () => {
  const { user } = useAuth();

  // console.log(user?.userId+"----user?.userId________")

    const { data: currentUserDetails, isLoading } = useQuery({
      queryKey: ["user", user?.userId],
      queryFn: () => userApi.getById(user?.userId),
    });
  
  // console.log(currentUserDetails+"+==============currentUserDetails")
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          Loading user info...
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    KeycloakService.doLogout({
      redirectUri: "http://localhost:3001/logout",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-xl w-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 flex flex-col items-center text-center space-y-6 border border-gray-200 dark:border-gray-700 relative overflow-hidden">

        {/* Glow border animation */}
        <div className="absolute inset-0 rounded-2xl border border-blue-400/30 animate-pulse blur-[1px] pointer-events-none"></div>

        {/* Profile Picture */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={`https://api.dicebear.com/8.x/identicon/svg?seed=${user.username || "User"}`}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>

        {/* User Name */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
            {user.name || user.username || "N/A"}
          </h2>
          {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            🌊 Active Citizen Contributor
          </p> */}
        </div>

        {/* User Info Cards */}
        <div className="w-full grid grid-cols-2 gap-4 mt-3">
          <div className="bg-blue-50 dark:bg-gray-700/50 rounded-xl py-3 shadow-inner">
            <p className="text-xs text-gray-500 dark:text-gray-400">User ID</p>
            <p className="text-base font-semibold text-blue-700 dark:text-blue-300 break-words">
              {user.userId || "N/A"}
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-700/50 rounded-xl py-3 shadow-inner">
            <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
            <p className="text-base font-semibold text-blue-700 dark:text-blue-300">
              {/* {user?.roles[3] || "NA"} */}
              {currentUserDetails?.role}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="w-full mt-4 bg-blue-50 dark:bg-gray-700/50 rounded-xl py-3 shadow-inner flex items-center justify-center gap-2">
          <FiMail className="text-blue-600 dark:text-blue-300" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {user.email || "Not Provided"}
          </span>
        </div>

        {/* Divider */}
        <div className="w-3/4 border-t border-gray-200 dark:border-gray-700 my-4"></div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none"
        >
          <FiLogOut
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
