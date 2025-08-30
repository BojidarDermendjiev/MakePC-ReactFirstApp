import { serverEndpoints, serverApiUrl } from "../common/generic";
import requester from "./requester";

const handleAuthResponse = (response, setUser) => {
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

export const logout = (setUser) => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
