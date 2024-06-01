import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

const Employee = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [menuList, setMenuList] = useState([]);
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    const getMenuList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/menu/list`
        );

        setMenuList(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    getMenuList();
  }, []);

  useEffect(() => {
    const getSelectedMenu = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/employee/selected-lunch-item`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.data.data && menuList.length > 0) {
          const item = menuList.find(
            (menu) => menu.value === response.data.data.menu_id
          );

          setSelectedItem({
            label: item.label,
            value: item.value,
          });
        }
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    getSelectedMenu();
  }, [menuList]);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/employee/lunch-item`,
        {
          menu_id: selectedItem.value,
          menu_name: selectedItem.label,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response) {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching menu list:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Lunch Items</h1>
      <div className="max-w-screen-lg mx-auto">
        <label className="block text-sm font-medium text-gray-700">
          Select an item:
        </label>
        <Select
          value={selectedItem}
          options={menuList}
          onChange={(e) => handleSelect(e)}
        />
        {selectedItem && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Selected Item:</h2>
            <h2 className="text-lg font-bold"> {selectedItem?.name}</h2>
          </div>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={selectedItem === ""}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2"
        >
          Save Menu
        </button>
      </div>
    </div>
  );
};

export default Employee;
