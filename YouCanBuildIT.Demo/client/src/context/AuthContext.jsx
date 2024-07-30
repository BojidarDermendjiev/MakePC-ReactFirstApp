import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = (value) => {
    setIsSignUp(value);
  };

  return (
    <AuthContext.Provider value={{ isSignUp, toggleForm }}>
      {children}
    </AuthContext.Provider>
  );
};
