import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      // setUserData(response.data.data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.data));
      if (response.data.data.user_type === 1) {
        navigate("/dashboard");
      }
      if (response.data.data.user_type === 2) {
        navigate("/employee");
      }
      toast(response.data.message);
    } catch (error) {
      toast(error?.message);
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error?.message) {
        setErrorMessage(error?.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <h2 className="text-center text-3xl font-extrabold">Login</h2>
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              <div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="email"
                  required
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between gap-4"></div>
              <div className="!mt-10">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
