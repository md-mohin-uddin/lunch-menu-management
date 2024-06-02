import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext/AuthContext";
import { USER_TYPE_ADMIN } from "../utils/constant";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  if (userData?.user_type !== USER_TYPE_ADMIN) {
    return navigate("/dashboard");
  }

  return <>{children}</>;
};

export default AdminLayout;
