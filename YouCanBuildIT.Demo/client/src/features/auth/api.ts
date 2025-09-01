import { serverEndpoints, serverApiUrl } from "../../common/generic";
import requester from "../../api/requester";

const handleAuthResponse = (response: any, setUser: (user: any) => void) => {
  const user = response.user || response;
  const token = response.token;

  const userFilteredData = {
    email: user.email,
    fullName: user.fullName || user.name,
    id: user.id || user._id,
    role: user.role,
    avatarUrl: user.avatarUrl || user.avatar,
  };

  setUser(userFilteredData);
  localStorage.setItem("user", JSON.stringify(userFilteredData));
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const authApi = {
  register: async (values: any, setUser: (user: any) => void) => {
    const response = await requester.post(
      `${serverApiUrl}${serverEndpoints.register}`,
      values
    );
    handleAuthResponse(response, setUser);
    return response;
  },

  login: async (values: any, setUser: (user: any) => void) => {
    const response = await requester.post(
      `${serverApiUrl}${serverEndpoints.login}`,
      values
    );
    handleAuthResponse(response, setUser);
    return response;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  }
};