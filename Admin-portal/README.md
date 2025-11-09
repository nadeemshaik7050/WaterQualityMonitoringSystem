#  Quick Start Guide

## Water Quality Admin Portal

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd /Users/pavansait/Desktop/Admin-portal-cashiering/wq/frontend
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - react-router-dom (routing)
   - @tanstack/react-query (data fetching)
   - axios (HTTP client)
   - keycloak-js (authentication)
   - react-hook-form (form management)
   - lucide-react (icons)
   - tailwindcss (styling)

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env (optional for development):**
   ```env
   VITE_KEYCLOAK_URL=https://your-keycloak-server/auth
   VITE_KEYCLOAK_REALM=water-quality
   VITE_KEYCLOAK_CLIENT_ID=admin-portal
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   ```
   http://localhost:3000
   ```

###  What You'll See

#### Dashboard (/)
- Overview statistics
- Quick action buttons
- Recent activity feed

#### Users (/users)
- List of all users with pagination
- Search functionality
- Create, View, Edit, Delete, Activate/Deactivate users

#### Rewards (/rewards)
- List of all rewards with pagination
- Search functionality
- Create, View, Edit, Delete, Activate/Deactivate rewards
## Features

### Dashboard
- Displays **key statistics** for users and rewards.
- Provides **quick actions** to:
  - Add users
  - Edit or delete users
  - Add and manage rewards
- Includes **interactive charts**:
  - Points distribution
  - Male vs Female user statistics
  - Reward-level distribution
- Shows **quick summaries** for:
  - Total Users
  - Total Rewards
  - Average Points

### User Management
- View all users in a paginated table.
- **Search users** by name, ID, or email.
- **Create new users** with proper validation.
- **Edit user details**.
- **Deactivate or reactivate** users.
- Delete users with confirmation.
- View detailed **user profiles** and stats.

### Reward Management
- View all rewards with pagination and search.
- **Create new rewards** with title, image, min and max points, and description.
- **Edit existing rewards** and update details.
- **Deactivate or reactivate** rewards.
- Delete rewards with confirmation.
- View reward badges and levels.
- Manage reward images and configurations.

### Data & Visualization
- Paginated and searchable tables for users and rewards.
- Visual dashboards for gender and points analytics.
- Charts displaying user distribution, performance, and achievements.

### UI/UX
- Fully responsive (mobile, tablet, and desktop).
- Built with **Tailwind CSS** for modern and clean design.
- Intuitive navigation using a **sidebar and top navbar**.
- Real-time notifications with **react-hot-toast**.
- Loading, error, and empty states for a smooth user experience.

---

###  Authentication

Current setup uses Keycloak with 'check-sso' mode:
- Routes are visible without full authentication
- API calls require authentication
- Token auto-refresh enabled

To bypass auth for development, the mock data works without Keycloak running.

### 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

###  Project Structure

```
src/
├── api/              # API services with mock data
├── components/       # Reusable UI components
│   └── layout/      # Header, Sidebar, Footer, Layout
├── hooks/           # Custom hooks (useDebounce)
├── lib/             # Keycloak configuration
│   └── keycloak/
├── pages/           # Route pages
│   ├── Dashboard.jsx
│   ├── users/      # User management pages
│   └── rewards/    # Reward management pages
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

###  Key Features Implemented

   **User Management**
- Create user with validation
- View user list with search and pagination
- View detailed user information
- Edit user data
- Delete user with confirmation
- Activate/Deactivate user status

   **Reward Management**
- Create reward with level selection
- View reward list with search and pagination
- View detailed reward information
- Edit reward data
- Delete reward with confirmation
- Activate/Deactivate reward status

   **UI/UX**
- Responsive design (mobile, tablet, desktop)
- Loading states
- Empty states
- Error handling
- Confirmation dialogs
- Success/error toasts
- Smooth transitions

   **Technical**
- React Router for navigation
- React Query for data fetching and caching
- Axios with interceptors
- Keycloak authentication
- Tailwind CSS styling
- Custom hooks (debounce)
- Mock data for development

### 🔧 Troubleshooting

**Port already in use:**
```bash
npm run dev -- --port 3001
```

**Dependencies not installed:**
```bash
rm -rf node_modules
npm install
```

**Build errors:**
```bash
npm cache clean --force
npm install
```

**Keycloak issues:**
- Check .env file configuration
- Ensure Keycloak server is accessible
- Verify client ID and realm settings

###  Browser Compatibility

Tested and working on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

###  Next Steps

1. **Connect Real API:**
   - Update API endpoints in `src/api/users.js` and `src/api/rewards.js`
   - Remove mock data
   - Configure CORS

2. **Enhanced Features:**
   - Add bulk operations
   - Export data to CSV/PDF
   - Advanced filtering
   - Analytics dashboard
