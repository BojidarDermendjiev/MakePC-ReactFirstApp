import React, { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    // Clear corrupted data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getStoredUser());

  const setUser = useCallback((userData) => {
    setUserState(userData);
    if (userData) {
      try {
        localStorage.setItem("user", JSON.stringify(userData));
      } catch {
        console.error("Failed to store user data");
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
  }), [user, setUser, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
