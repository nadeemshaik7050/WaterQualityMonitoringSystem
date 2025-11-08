import axiosInstance from "./axiosInstance";

export const rewardApi = {

  getAll: async () => {
    try {
      const { data } = await axiosInstance.get("/rewards/rating/all");

      if (!data?.result) {
        console.warn("Unexpected API response format:", data);
        return { result: [] };
      }

      //     Return raw API data directly (no mapping)
      return data;
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
      throw error;
    }
  },
    getById: async (id) => {
      try {
      const { data } = await axiosInstance.get(`/rewards/rating/get/${id}`);

      if (!data?.result) {
        console.warn("Unexpected API response format:", data);
        return { result: [] };
      }

      return data?.result

    } catch (error) {
      console.error("Failed to fetch rewards:", error);
      throw error;
    }
  },
updateReward: async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "rewards/rating/update",
      payload, // plain object, not FormData
      {
         headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to update reward:", error);
    throw error;
  }
},



  
 createReward: async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "rewards/rating/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to create reward:", error);
    throw error;
  }
},
toggleRewardStatus: async (ratingId) => {
  try {
    await axiosInstance.get("/rewards/rating/toggleRating", {
      params: { ratingId },
    });

    console.log("  Reward status toggled successfully");
    return { success: true };
  } catch (error) {
    console.error(`   Failed to toggle reward status (${ratingId}):`, error);
    return { success: false, message: error.message };
  }
},
  // 🔹 Get total user count
  getCountRewards: async () => {
  const { data } = await axiosInstance.get("/rewards/rating/count");
  // Extract only result value from object
  return data.result ?? 0;
},


};