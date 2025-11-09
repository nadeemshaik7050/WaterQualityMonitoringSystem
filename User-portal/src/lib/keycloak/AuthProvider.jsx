// AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import KeycloakService, { initKeycloak } from './service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    initKeycloak((auth) => {
      setAuthenticated(auth);

      if (auth) {
        const kc = KeycloakService.getKeycloak();
        const tokenParsed = kc.tokenParsed;

        const userInfo = {
          username: tokenParsed?.preferred_username,
          email: tokenParsed?.email,
          name: tokenParsed?.name,
          userId: tokenParsed?.sub,
          roles: tokenParsed?.realm_access?.roles || [],
        };

        setUser(userInfo);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authenticated) {
    KeycloakService.doLogin();
    return null;
  }

  return (
    <AuthContext.Provider value={{ authenticated, user }}>
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
