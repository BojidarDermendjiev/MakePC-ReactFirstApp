import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  user: null,
});

// eslint-disable-next-line no-unused-vars
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider
