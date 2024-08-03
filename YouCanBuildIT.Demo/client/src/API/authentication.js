import { serverEndpoints, serverUrl } from "../common/generic";

const fetchAuthentication = async (endpoint, values, setUser) => {
  const res = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const user = await res.json();
  
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
  await fetch(`${serverUrl}${serverEndpoints.logout}`);

  setUser(null);

  localStorage.removeItem("user");
};

export const getUser = async () => {};
