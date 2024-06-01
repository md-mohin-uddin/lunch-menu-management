import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MenuEdit = ({ menuItemToEdit, setIsEdit }) => {
  const [name, setName] = useState(menuItemToEdit?.name);
  const [error, setError] = useState("");

  useEffect(() => {
    if (menuItemToEdit) {
      setName(menuItemToEdit?.name);
    }
  }, [menuItemToEdit]);

  const handleEdit = async () => {
    try {
      if (!name.trim()) {
        setError("Menu name is required.");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/menu/${menuItemToEdit.id}`,
        {
          name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response) {
        console.log({ response });
        toast(response.data.message);
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      setError("An error occurred while adding the menu item.");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <Link to={"./employee-choice-list"}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Employee Choice List
        </button>
      </Link>
      <div className="container border border-gray-200 p-4 my-4 rounded">
        <h2 className="text-lg font-bold mb-2">Add Daily Menu Options</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700"
            >
              Menu Item:
            </label>
            <div className="flex">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Menu
          </button>
        </form>
      </div>
    </>
  );
};

export default MenuEdit;
