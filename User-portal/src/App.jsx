import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Router, Navigate } from "react-router-dom";
import MakeReview from "./pages/MakeReview";
import UserProfile from "./pages/UserProfile";
import CustomToaster from "./Components/Global/CustomToast";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./lib/keycloak/AuthProvider";
import Rankings from "./pages/Rankings";
import { UserProvider } from "./Context/UserContext";
// import LogoutPage from "./Components/Dashboard/Logout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {

 return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <UserProvider>
        <BrowserRouter>
          <Navbar/>
            <Routes>
             <Route path="/" element={<Dashboard />} />
          <Route path="/make-review" element={<MakeReview />} />
          <Route path="/user-profile" element={<UserProfile />} />
           <Route path="/rankings" element={<Rankings />} />
          
          {/* <Route path="/logout" element={<LogoutPage />} /> */}
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <CustomToaster/>
          {/* </Layout> */}
        </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
