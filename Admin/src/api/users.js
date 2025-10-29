// Mock user data
const MOCK_USERS = [
  {
    userId: '1',
    username: 'john_doe',
    email: 'john@example.com',
    activeStatus: true,
    totalReviews: 45,
    joinedDate: '2024-01-15',
    citizenId: 'CIT001',
    points: 1250,
    gender: 'Male',
    age: 32,
  },
  {
    userId: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    activeStatus: true,
    totalReviews: 67,
    joinedDate: '2024-02-20',
    citizenId: 'CIT002',
    points: 1890,
    gender: 'Female',
    age: 28,
  },
  {
    userId: '3',
    username: 'bob_wilson',
    email: 'bob@example.com',
    activeStatus: false,
    totalReviews: 23,
    joinedDate: '2024-03-10',
    citizenId: 'CIT003',
    points: 650,
    gender: 'Male',
    age: 45,
  },
  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },  {
    userId: '4',
    username: 'alice_brown',
    email: 'alice@example.com',
    activeStatus: true,
    totalReviews: 89,
    joinedDate: '2024-01-05',
    citizenId: 'CIT004',
    points: 2340,
    gender: 'Female',
    age: 35,
  },
  {
    userId: '5',
    username: 'charlie_davis',
    email: 'charlie@example.com',
    activeStatus: true,
    totalReviews: 34,
    joinedDate: '2024-04-12',
    citizenId: 'CIT005',
    points: 980,
    gender: 'Other',
    age: 29,
  },
];

let userIdCounter = MOCK_USERS.length + 1;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userApi = {
  getAll: async ({ pageNumber = 0, pageSize = 10 }) => {
    await delay(500);
    const start = pageNumber * pageSize;
    const end = start + pageSize;
    
    return {
      result: MOCK_USERS.slice(start, end),
      pagination: {
        totalPageCount: Math.ceil(MOCK_USERS.length / pageSize),
        pageNumber,
        pageSize,
        totalItems: MOCK_USERS.length,
      },
    };
  },

  getById: async (id) => {
    await delay(300);
    const user = MOCK_USERS.find(u => u.userId === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  create: async (userData) => {
    await delay(500);
    const newUser = {
      ...userData,
      userId: String(userIdCounter++),
      activeStatus: true,
      totalReviews: 0,
      points: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    MOCK_USERS.push(newUser);
    return newUser;
  },

  update: async (id, userData) => {
    await delay(500);
    const index = MOCK_USERS.findIndex(u => u.userId === id);
    if (index === -1) throw new Error('User not found');
    
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...userData };
    return MOCK_USERS[index];
  },

  delete: async (id) => {
    await delay(500);
    const index = MOCK_USERS.findIndex(u => u.userId === id);
    if (index === -1) throw new Error('User not found');
    
    MOCK_USERS.splice(index, 1);
    return { success: true };
  },

  toggleStatus: async (id) => {
    await delay(300);
    const user = MOCK_USERS.find(u => u.userId === id);
    if (!user) throw new Error('User not found');
    
    user.activeStatus = !user.activeStatus;
    return user;
  },

  search: async (query) => {
    await delay(400);
    const results = MOCK_USERS.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.citizenId.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      result: results,
      pagination: {
        totalPageCount: 1,
        pageNumber: 0,
        pageSize: results.length,
        totalItems: results.length,
      },
    };
  },
};
