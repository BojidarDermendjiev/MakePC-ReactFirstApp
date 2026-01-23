import { serverEndpoints, serverApiUrl } from "../common/generic";
import requester from "./requester";

/**
 * Handles auth response - tokens are now stored in HTTP-only cookies by the server.
 * We only need to store user info (non-sensitive data) in localStorage for UI state.
 */
const handleAuthResponse = (response, setUser) => {
  const user = response.user || response;

  const userFilteredData = {
    email: user.email,
    fullName: user.fullName || user.name,
    id: user.userId || user.id || user._id,
    role: user.role,
    avatarUrl: user.avatarUrl || user.avatar,
    expiresUtc: user.expiresUtc,
  };

  setUser(userFilteredData);
  localStorage.setItem("user", JSON.stringify(userFilteredData));
  // Note: Tokens are now stored in HTTP-only cookies, not localStorage
};

export const register = async (values, setUser) => {
  const response = await requester.post(
    `${serverApiUrl}${serverEndpoints.register}`,
    values
  );
  handleAuthResponse(response, setUser);
};

export const login = async (values, setUser) => {
  const response = await requester.post(
    `${serverApiUrl}${serverEndpoints.login}`,
    values
  );
  handleAuthResponse(response, setUser);
};

/**
 * Logout - calls the API to clear HTTP-only cookies on the server
 */
export const logout = async (setUser) => {
  try {
    await requester.post(`${serverApiUrl}/auth/logout`);
  } catch (error) {
    // Even if API call fails, clear local state
    console.error("Logout API call failed:", error);
  }
  setUser(null);
  localStorage.removeItem("user");
};

/**
 * Verify current session by calling /auth/me
 * Returns user data if session is valid, null otherwise
 */
export const verifySession = async () => {
  try {
    const response = await requester.get(`${serverApiUrl}/auth/me`);
    return {
      id: response.userId,
      email: response.email,
      fullName: response.fullName,
      role: response.roles?.[0] || "User",
    };
  } catch {
    return null;
  }
};

/**
 * Refresh the access token using the refresh token cookie
 */
export const refreshToken = async () => {
  try {
    const response = await requester.post(`${serverApiUrl}/auth/refresh`);
    return response;
  } catch {
    return null;
  }
};
