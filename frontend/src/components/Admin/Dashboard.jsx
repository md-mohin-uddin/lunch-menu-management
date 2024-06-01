import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import Menu from "../Admin/Menu";
import MenuList from "../Admin/MenuList";
import MenuEdit from "./MenuEdit";
import axios from "axios";

function Dashboard() {
  const [menuList, setMenuList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState(null);
  const [menuAddSuccess, setMenuAddIsSuccess] = useState(false);

  const { token, loading } = useContext(AuthContext);

  useEffect(() => {
    const getMenuList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/menu/list`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setMenuList(response.data);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    getMenuList();
  }, [menuAddSuccess, isEdit]);

  return (
    <>
      <h1 className="text-2xl font-semibold m-5 text-center">
        Admin Dashboard
      </h1>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isEdit ? (
          <MenuEdit menuItemToEdit={menuItemToEdit} setIsEdit={setIsEdit} />
        ) : (
          <Menu setMenuAddIsSuccess={setMenuAddIsSuccess} />
        )}

        <MenuList
          menuList={menuList}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setMenuItemToEdit={setMenuItemToEdit}
        />
      </div>
    </>
  );
}

export default Dashboard;
