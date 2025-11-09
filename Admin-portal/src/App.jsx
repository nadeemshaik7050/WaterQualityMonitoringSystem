import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import { CreateUser } from './pages/users/CreateUser';
import Dashboard from './pages/Dashboard';
import { UsersList } from './pages/users/UsersList';
import { EditUser } from './pages/users/EditUser';
import { ViewUser } from './pages/users/ViewUser';
import RewardsList from './pages/rewards/RewardsList';
import CreateReward from './pages/rewards/CreateReward';
import EditReward from './pages/rewards/EditReward';
import ViewReward from './pages/rewards/ViewReward';
import { AuthProvider } from './lib/keycloak/AuthProvider';
import CustomToaster from './components/global/CustomToast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              {/* User Routes */}
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/users/:id" element={<ViewUser />} />
              
              {/* Reward Routes */}
              <Route path="/rewards" element={<RewardsList />} />
              <Route path="/rewards/create" element={<CreateReward />} />
              <Route path="/rewards/edit/:id" element={<EditReward />} />
              <Route path="/rewards/:id" element={<ViewReward />} />
              {/* <Route path="/logout" element={<Logout />} /> */}

              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <CustomToaster/>
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
