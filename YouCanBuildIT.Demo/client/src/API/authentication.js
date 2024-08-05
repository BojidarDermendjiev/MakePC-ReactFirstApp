import { serverEndpoints, serverUrl } from "../common/generic";
import requester from "./requester";

const fetchAuthentication = async (endpoint, values, setUser) => {
  const user = await requester.post(endpoint, values);

  const userFilteredData = {
    email: user.email,
    name: user.name,
    _id: user._id,
  };

  setUser(userFilteredData);

  localStorage.setItem("user", JSON.stringify(userFilteredData));
};

export const register = async (values, setUser) => {
  await fetchAuthentication(
    `${serverUrl}${serverEndpoints.register}`,
    values,
    setUser
  );
};

export const login = async (values, setUser) => {
  await fetchAuthentication(
    `${serverUrl}${serverEndpoints.login}`,
    values,
    setUser
  );
};

export const logout = async (setUser) => {
  await requester.post(`${serverUrl}${serverEndpoints.logout}`);

  setUser(null);

  localStorage.removeItem("user");
};
