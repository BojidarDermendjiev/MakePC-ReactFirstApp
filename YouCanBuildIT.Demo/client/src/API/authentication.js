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
  const existingUsers = await requester.get(
    `${serverUrl}${serverEndpoints.register}`
  );

  const isDuplicate = Object.values(existingUsers).some(
    (user) => user.email === values.email
  );

  if (isDuplicate) {
    throw new Error("A user with this email already exists.");
  }
  await fetchAuthentication(
    `${serverUrl}${serverEndpoints.register}`,
    values,
    setUser
  );
};

export const login = async (values, setUser) => {
  const existingUsers = await requester.get(
    `${serverUrl}${serverEndpoints.login}`
  );

  const user = Object.values(existingUsers).find(
    (user) => user.email === values.email && user.password === values.password
  );
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const userFilteredData = {
    email: user.email,
    name: user.name,
    _id: user._id,
  };

  setUser(userFilteredData);

  localStorage.setItem("user", JSON.stringify(userFilteredData));
};

export const logout = async (setUser) => {
  await requester.post(`${serverUrl}${serverEndpoints.logout}`);

  setUser(null);

  localStorage.removeItem("user");
};
