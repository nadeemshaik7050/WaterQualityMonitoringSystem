import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { userApi } from "@/api/user";
import { useAuth } from "@/lib/keycloak/AuthProvider";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentUserDetails, setCurrentUserDetails] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDetails", user?.userId],
    queryFn: () => userApi.getById(user?.userId),
    enabled: !!user?.userId,
  });

  useEffect(() => {
    if (data) setCurrentUserDetails(data);
  }, [data]);

  return (
    <UserContext.Provider value={{ currentUserDetails, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
