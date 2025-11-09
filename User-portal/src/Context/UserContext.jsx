import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { userApi } from "@/api/user";
import { useAuth } from "@/lib/keycloak/AuthProvider";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = useAuth(); // From Keycloak
  const userId = user?.userId || user?.sub || user?.id || user?.citizenId;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => userApi.getById(userId),
    enabled: !!userId, //  prevent API call until userId is available
  });

  const currentUserDetails = data?.result ?? null;

  // console.log(" Current User Details:", currentUserDetails);

  return (
    <UserContext.Provider value={{ currentUserDetails, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
