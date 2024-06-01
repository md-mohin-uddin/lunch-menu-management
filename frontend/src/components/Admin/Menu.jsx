import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Menu = ({ setMenuAddIsSuccess }) => {
  const [name, setName] = useState("");
  const [servingDate, setServingDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      if (!name.trim()) {
        setError("Menu name is required.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/menu/add`,
        {
          name,
          serving_date: new Date(servingDate),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast(response.data.message);
      setName("");
      setServingDate(new Date());
      setError("");
      setMenuAddIsSuccess(true);
    } catch (error) {
      console.error("Error adding menu:", error);
      setError("An error occurred while adding the menu item.");
    }
  };

  const handleDateChange = (e) => {
    setServingDate(e.target.value);
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
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              value={servingDate}
              onChange={handleDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
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

          {/* {error && <p className="text-red-500">{error}</p>} */}

          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Menu
          </button>
        </form>
      </div>
    </>
  );
};

export default Menu;
