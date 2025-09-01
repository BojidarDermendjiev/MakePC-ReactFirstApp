import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { login, register, logout } from "../../../api/authentication";

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (credentials) => {
    try {
      await login(credentials, setUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData, setUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleLogout = () => {
    logout(setUser);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return {
    user,
    isAuthenticated,
    isAdmin,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};