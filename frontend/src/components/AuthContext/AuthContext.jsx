/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    setToken(storedToken);
    setUserData(userInfo);
    setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ userData, setUserData, token, setToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
