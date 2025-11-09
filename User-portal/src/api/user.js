import axiosInstance from "./axiosInstance";

export const userApi = {

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

};