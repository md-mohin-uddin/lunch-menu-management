import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext/AuthContext";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  if (!token) {
    return navigate("/login");
  }

  return <>{children}</>;
};

export default AuthLayout;
