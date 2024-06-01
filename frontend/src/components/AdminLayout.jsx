import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext/AuthContext";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  console.log({ userData });

  if (userData?.user_type !== 1) {
    return navigate("/dashboard");
  }

  return <>{children}</>;
};

export default AdminLayout;
