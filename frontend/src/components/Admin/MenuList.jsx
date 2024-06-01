import axios from "axios";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

const MenuList = ({ isEdit, setIsEdit, setMenuItemToEdit, menuList }) => {
  // const [menuList, setMenuList] = useState([]);
  const [newMenu, setNewMenu] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (menuItem) => {
    setIsEdit(true);
    setMenuItemToEdit(menuItem);
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete menu.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/menu/${id}`,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );

              if (response) {
                toast(response.data.message);
                setIsEdit(!isEdit);
              }
            } catch (error) {
              console.log({ error });
            }
          },
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {menuList?.map((menuItem) => (
                <div key={menuItem.id} className="bg-gray-100 rounded-lg p-4">
                  <p className="text-lg font-semibold">
                    Menu Item: {menuItem.name}
                  </p>
                  <p className="text-gray-500">
                    {new Date(menuItem.serving_date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleEdit(menuItem)}
                      className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(menuItem.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuList;
