import axiosInstance from "./axiosInstance";

export const rankingsApi = {
  // 1 Get All Rankings
  getAll: async () => {
    try {
      const { data } = await axiosInstance.get("/crowddata/user/rankings");
      if (!data?.result) {
        console.warn("Unexpected API response format:", data);
        return { result: [] };
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch rankings:", error);
      throw error;
    }
  },

  //  Submit Water Quality Data (multipart/form-data)
  submitWaterQuality: async (formData, token) => {
    try {
      const { data } = await axiosInstance.post(
        "/crowddata/waterquality/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to submit water quality data:", error);
      throw error;
    }
  },

  //  Get User Ratings
  getUserRatings: async (citizenId, token) => {
    try {
      const { data } = await axiosInstance.get(
        `/rewards/rating/getUserRating?citizenId=${citizenId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch user ratings:", error);
      throw error;
    }
  },

  //  Get Previous Reviews
  getPreviousReviews: async (citizenId, token) => {
    try {
      const { data } = await axiosInstance.get(
        `/crowddata/waterquality/previousReviews?citizenId=${citizenId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Failed to fetch previous reviews:", error);
      throw error;
    }
  },
};
