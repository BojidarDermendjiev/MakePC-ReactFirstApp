import { serverEndpoints, serverUrl } from "../common/generic";
import requester from "./requester";

const handleAuthResponse = (response, setUser) => {
  const user = response.user || response;
  const token = response.token;

  const userFilteredData = {
    email: user.email,
    fullName: user.fullName || user.name,
    id: user.id || user._id,
    role: user.role,
  };

  setUser(userFilteredData);
  localStorage.setItem("user", JSON.stringify(userFilteredData));
  if (token) {
    localStorage.setItem("token", token);
  }
};

export const register = async (values, setUser) => {
  try {
    const response = await requester.post(
      `${serverUrl}${serverEndpoints.register}`,
      values
    );
    handleAuthResponse(response, setUser);
  } catch (err) {
    throw new Error(
      err?.response?.data?.error || "Registration failed. Please try again."
    );
  }
};

export const login = async (values, setUser) => {
  try {
    const response = await requester.post(
      `${serverUrl}${serverEndpoints.login}`,
      values
    );
    handleAuthResponse(response, setUser);
  } catch (err) {
    throw new Error(
      err?.response?.data?.error ||
        "Login failed. Please check your credentials."
    );
  }
};

export const logout = (setUser) => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
