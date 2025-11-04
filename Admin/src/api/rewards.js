import axios from "axios";
import axiosInstance from "./axiosInstance";

// Mock reward data
const MOCK_REWARDS = [
  {
    rewardId: '1',
    rewardName: 'Bronze Water Tester',
    rank: 1,
    level: 'Bronze',
    redeemed: false,
    description: 'Complete 10 water quality tests',
    pointsRequired: 100,
    activeStatus: true,
    createdDate: '2024-01-01',
    imageUrl: null,
  },
  {
    rewardId: '2',
    rewardName: 'Silver Contributor',
    rank: 2,
    level: 'Silver',
    redeemed: false,
    description: 'Complete 25 water quality tests',
    pointsRequired: 250,
    activeStatus: true,
    createdDate: '2024-01-01',
    imageUrl: null,
  },
  {
    rewardId: '3',
    rewardName: 'Gold Guardian',
    rank: 3,
    level: 'Gold',
    redeemed: true,
    description: 'Complete 50 water quality tests',
    pointsRequired: 500,
    activeStatus: true,
    createdDate: '2024-01-01',
    imageUrl: null,
  },
  {
    rewardId: '4',
    rewardName: 'Platinum Protector',
    rank: 4,
    level: 'Platinum',
    redeemed: false,
    description: 'Complete 100 water quality tests',
    pointsRequired: 1000,
    activeStatus: true,
    createdDate: '2024-01-01',
    imageUrl: null,
  },
  {
    rewardId: '5',
    rewardName: 'Community Champion',
    rank: 5,
    level: 'Gold',
    redeemed: false,
    description: 'Help organize 5 community cleanups',
    pointsRequired: 750,
    activeStatus: false,
    createdDate: '2024-02-15',
    imageUrl: null,
  },
];

let rewardIdCounter = MOCK_REWARDS.length + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const rewardApi = {

  getAll: async () => {
    try {
      const { data } = await axiosInstance.get("/rewards/rating/all");
      console.log("data"+data.result)
      if (!data?.result) {
        console.warn("Unexpected API response format:", data);
        return { result: [] };
      }

      const mappedData = data.result.map((item, index) => ({
        rewardId: item.id,
        rewardName: item.name,
        rank: index + 1,
        level: "NA",
        redeemed: false,
        description: item.description || "Water Quality Badge",
        pointsRequired: item.points,
        activeStatus: item.activeStatus ?? true,
        createdDate: item.creationDate || "NA",
        imageUrl: null   // ignoring image as requested
      }));

      return { result: mappedData };

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
          "Content-Type": "application/json",
        },
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



};



// export const rewardApi = {

//   getAll: async ({ pageNumber = 0, pageSize = 10 }) => {
//     await delay(500);
//     const start = pageNumber * pageSize;
//     const end = start + pageSize;
    
//     return {
//       result: MOCK_REWARDS.slice(start, end),
//       pagination: {
//         totalPageCount: Math.ceil(MOCK_REWARDS.length / pageSize),
//         pageNumber,
//         pageSize,
//         totalItems: MOCK_REWARDS.length,
//       },
//     };
//   },

//   getById: async (id) => {
//     await delay(300);
//     const reward = MOCK_REWARDS.find(r => r.rewardId === id);
//     if (!reward) throw new Error('Reward not found');
//     return reward;
//   },

//   create: async (rewardData) => {
//     await delay(500);
    
//     // Handle FormData for image upload
//     let parsedData = rewardData;
//     let imageUrl = null;
    
//     if (rewardData instanceof FormData) {
//       parsedData = {
//         rewardName: rewardData.get('rewardName'),
//         rank: rewardData.get('rank'),
//         level: rewardData.get('level'),
//         pointsRequired: rewardData.get('pointsRequired'),
//         description: rewardData.get('description'),
//       };
      
//       // Simulate image upload - in real API, this would be handled server-side
//       const imageFile = rewardData.get('image');
//       if (imageFile && imageFile instanceof File) {
//         // Create a temporary URL for the uploaded image
//         imageUrl = URL.createObjectURL(imageFile);
//         console.log('Image uploaded:', imageFile.name, imageFile.type, imageFile.size);
//       }
//     }
    
//     const newReward = {
//       ...parsedData,
//       rewardId: String(rewardIdCounter++),
//       activeStatus: true,
//       redeemed: false,
//       createdDate: new Date().toISOString().split('T')[0],
//       imageUrl,
//     };
//     MOCK_REWARDS.push(newReward);
//     return newReward;
//   },

//   update: async (id, rewardData) => {
//     await delay(500);
//     const index = MOCK_REWARDS.findIndex(r => r.rewardId === id);
//     if (index === -1) throw new Error('Reward not found');
    
//     // Handle FormData for image upload
//     let parsedData = rewardData;
//     let imageUrl = MOCK_REWARDS[index].imageUrl; // Keep existing image by default
    
//     if (rewardData instanceof FormData) {
//       parsedData = {
//         rewardName: rewardData.get('rewardName'),
//         rank: rewardData.get('rank'),
//         level: rewardData.get('level'),
//         pointsRequired: rewardData.get('pointsRequired'),
//         description: rewardData.get('description'),
//       };
      
//       // Handle image update
//       const imageFile = rewardData.get('image');
//       if (imageFile && imageFile instanceof File) {
//         // Create a temporary URL for the uploaded image
//         imageUrl = URL.createObjectURL(imageFile);
//         console.log('Image updated:', imageFile.name, imageFile.type, imageFile.size);
//       }
//     }
    
//     MOCK_REWARDS[index] = { 
//       ...MOCK_REWARDS[index], 
//       ...parsedData,
//       imageUrl,
//     };
//     return MOCK_REWARDS[index];
//   },

//   delete: async (id) => {
//     await delay(500);
//     const index = MOCK_REWARDS.findIndex(r => r.rewardId === id);
//     if (index === -1) throw new Error('Reward not found');
    
//     MOCK_REWARDS.splice(index, 1);
//     return { success: true };
//   },

//   toggleStatus: async (id) => {
//     await delay(300);
//     const reward = MOCK_REWARDS.find(r => r.rewardId === id);
//     if (!reward) throw new Error('Reward not found');
    
//     reward.activeStatus = !reward.activeStatus;
//     return reward;
//   },

//   search: async (query) => {
//     await delay(400);
//     const results = MOCK_REWARDS.filter(reward =>
//       reward.rewardName.toLowerCase().includes(query.toLowerCase()) ||
//       reward.description.toLowerCase().includes(query.toLowerCase())
//     );
    
//     return {
//       result: results,
//       pagination: {
//         totalPageCount: 1,
//         pageNumber: 0,
//         pageSize: results.length,
//         totalItems: results.length,
//       },
//     };
//   },
// };
