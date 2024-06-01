import axios from "axios";
import { useEffect, useState } from "react";
import SimpleTableComponent from "reactjs-simple-table";

const columns = [
  {
    field: "username",
    headerName: "Employee",
  },
  {
    field: "menu_name",
    headerName: "Lunch Item",
  },
];

const EmployeeChoiceList = () => {
  const [employeelist, setEmployeeList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/employee/lunch-item`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log({ response });

      setEmployeeList(response.data);
    };
    getList();
  }, []);
  // const list = [
  //   { employee: "Michael", lunchItem: "Vegetable Stir Fry" },
  //   { employee: "Lindsay", lunchItem: "Caesar Salad" },
  //   { employee: "Tobias", lunchItem: "Pasta Alfredo" },
  //   { employee: "Byron", lunchItem: "Grilled Salmon" },
  //   { employee: "George", lunchItem: "Greek Salad" },
  //   { employee: "Rachel", lunchItem: "Tacos" },
  //   { employee: "Lawson", lunchItem: "Sushi" },
  //   { employee: "Ferguson", lunchItem: "Pizza" },
  //   { employee: "Funke", lunchItem: "Burger" },
  // ];
  return (
    <div className="App container mx-auto px-4 sm:px-6 lg:px-8">
      <SimpleTableComponent columns={columns} list={employeelist} />
    </div>
  );
};
export default EmployeeChoiceList;
