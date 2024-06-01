import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Registration from "./components/Register/Registration";
import Dashboard from "./components/Admin/Dashboard";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import AuthLayout from "./components/AuthLayout";
import EmployeeChoiceList from "./components/Admin/EmployeeChoiceList";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Employee from "./components/Employee/Employee";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Registration />} />{" "}
          <Route
            path="/employee"
            element={
              <AuthLayout>
                <Employee />
              </AuthLayout>
            }
          />{" "}
          <Route
            path="/dashboard/employee-choice-list"
            element={
              <AuthLayout>
                <AdminLayout>
                  <EmployeeChoiceList />
                </AdminLayout>
              </AuthLayout>
            }
          />{" "}
          <Route
            path="/dashboard"
            element={
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            }
          />
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
