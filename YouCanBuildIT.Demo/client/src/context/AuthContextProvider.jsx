import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const userFromStore = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(userFromStore || null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
