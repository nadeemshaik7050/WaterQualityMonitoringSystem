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
      citizenId: user.citizenId,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "N/A", 
      userName: user.userName || "N/A",
      role: user.role || "N/A",
      gender: user.gender || "N/A",
      phoneNum: user.phoneNumber || "N/A",
      joinedDate: user.joinedDate || "N/A",
      points: user.points || 0,
      totalReviews: user.numberOfReviewsGiven || 0,
      active: user.active ?? true,
      rank: index + 1,
    }));

    return { result: mappedData };
  } catch (error) {
    console.error(" Failed to fetch users:", error);
    throw error;
  }
},

 getMaxPointsUsers: async () => {
    try {
      const { result } = await userApi.getAll();

      if (!result.length) return { result: [] };

      // Find the maximum points
      const maxPoints = Math.max(...result.map(user => user.points));

      // Filter users who have that maximum
      const maxPointsUsers = result.filter(user => user.points === maxPoints);
      console.log(maxPointsUsers+"maxPointsUsers")

      return { result: maxPointsUsers, maxPoints };
    } catch (error) {
      console.error("Failed to fetch max points users:", error);
      throw error;
    }
  },

 getGenderCount: async () => {
    try {
      const { result } = await userApi.getAll();

      if (!result.length) return { male: 0, female: 0 };

      // Normalize gender values to lowercase for consistency
      const maleCount = result.filter(
        user => user.gender?.toLowerCase() === "male"
      ).length;

      const femaleCount = result.filter(
        user => user.gender?.toLowerCase() === "female"
      ).length;

      return { male: maleCount, female: femaleCount };
    } catch (error) {
      console.error("Failed to fetch gender count:", error);
      throw error;
    }
  }
,

  // 🔹 Get user by ID
getById: async (citizenId) => {
  try {
    const { data } = await axiosInstance.get("/crowddata/user/get", {
      params: {citizenId},
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
      const payload = { ...userData, citizenId: id };

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

 toggleStatus: async (citizenId) => {
    try {
      const { data } = await axiosInstance.get(
        "/crowddata/user/toggleActivate",
        {
          params: { citizenId }, //   Query parameters must be passed inside this object
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
