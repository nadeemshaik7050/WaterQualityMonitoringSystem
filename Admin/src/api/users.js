import axiosInstance from "./axiosInstance";
//gett user id from auth

export const userApi = {
  // 🔹 Get all users
getAll: async () => {
  try {
    const { data } = await axiosInstance.get("/crowddata/user/allUsers");

    const usersArray = Array.isArray(data)
      ? data
      : Array.isArray(data.result)
      ? data.result
      : [];

    if (!usersArray.length) {
      console.warn("Unexpected response format:", data);
      return { result: [] };
    }

    const mappedData = usersArray.map((user, index) => ({
      userId: user.userId,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "N/A",
      userName: user.userName || "N/A",
      role: user.role || "N/A",
      gender: user.gender || "N/A",
      phoneNum: user.phoneNumber || "N/A",
      joinedDate: user.joinedDate || "N/A",
      points: user.points || 0,
      totalReviews: user.numberOfRewardsGiven || 0,
      activeStatus: user.activeStatus ?? true,
      rank: index + 1,
    }));

    return { result: mappedData };
  } catch (error) {
    console.error(" Failed to fetch users:", error);
    throw error;
  }
},


  // 🔹 Get user by ID
getById: async (userId) => {
  try {
    const { data } = await axiosInstance.get("/crowddata/user/get", {
      params: { userId },
    });

    if (!data || !data.result) {
      console.warn("Unexpected response format:", data);
      return null;
    }

    return data.result; //   Return only the actual user object
  } catch (error) {
    console.error(`Failed to fetch user (${userId}):`, error);
    throw error;
  }
},


  // 🔹 Create a new user
  create: async (userData) => {
    try {
      const { data } = await axiosInstance.post(
        "/crowddata/user/create",
        userData
      );

      if (!data || !data.userId) {
        console.warn("Unexpected user creation response:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.error("   Failed to create user:", error);
      throw error;
    }
  },

  //edit user
   update: async (id, userData) => {
    try {
      const payload = { ...userData, userId: id };

      const { data } = await axiosInstance.post(
        "/crowddata/user/update",
        payload
      );
      return data;
    } catch (error) {
      console.error(" Error updating user:", error);
      throw error;
    }
  },

 toggleStatus: async (userId) => {
    try {
      const { data } = await axiosInstance.get(
        "/crowddata/user/toggleActivate",
        {
          params: { userId }, //   Query parameters must be passed inside this object
        }
      );

      console.log("  Toggle user response:", data);
      return data;
    } catch (error) {
      console.error(`   Failed to toggle user status (${userId}):`, error);
      throw error;
    }
  },

  // 🔹 Get total user count
  getCount: async () => {
  const { data } = await axiosInstance.get("/crowddata/user/count");
  // Extract only result value from object
  return data.result ?? 0;
},

};
