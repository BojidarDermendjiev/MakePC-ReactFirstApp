import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const authContext = createContext({
  user: null,
});

// eslint-disable-next-line no-unused-vars
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useAuth();

  return (
    <AuthContextProvider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContextProvider>
  );
};

export default AuthContextProvider
