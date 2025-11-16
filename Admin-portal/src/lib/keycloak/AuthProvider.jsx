import { createContext, useContext, useEffect, useState } from 'react';
import KeycloakService, { initKeycloak } from './service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    authenticated: false,
    loading: true,
    userId: null,
    username: null,
    roles: [],
    token: null,
  });

  useEffect(() => {
    initKeycloak((auth) => {
      if (auth) {
        const username = KeycloakService.getUsername();
        const userId = KeycloakService.getUserId(); // 👈 new helper from your KeycloakService
        const roles = KeycloakService.getUserRoles();
        const token = KeycloakService.getToken();

        setAuthData({
          authenticated: true,
          loading: false,
          username,
          userId,
          roles,
          token,
        });
      } else {
        setAuthData({
          authenticated: false,
          loading: false,
          username: null,
          userId: null,
          roles: [],
          token: null,
        });
      }
    });
  }, []);

  if (authData.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
if (!authData.authenticated) {
  if (window.location.pathname !== "/register") {
    KeycloakService.doLogin();
  }
  return null;
}
  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// import { createContext, useContext, useEffect, useState } from 'react';
// import KeycloakService, { initKeycloak } from './service';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     initKeycloak((auth) => {
//       setAuthenticated(auth);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//     if (!authenticated) {
//     KeycloakService.doLogin(); // 👈 redirect to Keycloak login if not logged in
//     return null;
//   }

//   return (
//     <AuthContext.Provider value={{ authenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };
