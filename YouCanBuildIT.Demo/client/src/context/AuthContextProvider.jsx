import { createContext, useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { verifySession, logout as apiLogout } from "../api/authentication";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    // Clear corrupted data
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUserState] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  // Verify session on mount using HTTP-only cookie
  useEffect(() => {
    const checkSession = async () => {
      const storedUser = getStoredUser();
      if (storedUser) {
        // Verify with server that the cookie session is still valid
        const verifiedUser = await verifySession();
        if (verifiedUser) {
          setUserState(verifiedUser);
          localStorage.setItem("user", JSON.stringify(verifiedUser));
        } else {
          // Session invalid, clear local state
          setUserState(null);
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

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

  const logout = useCallback(async () => {
    await apiLogout(setUserState);
  }, []);

  const contextValue = useMemo(() => ({
    user,
    setUser,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }), [user, setUser, logout, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
