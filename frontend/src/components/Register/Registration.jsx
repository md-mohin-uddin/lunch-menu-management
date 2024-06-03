import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username,
          password,
        }
      );

      toast(response.data.message);
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <>
      <div className="bg-gray-50 font-[sans-serif] text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
            <h1 className="mb-8 text-3xl font-extrabold text-center">
              Register
            </h1>
            <form onSubmit={handleSubmit} className="mt-10 space-y-4">
              <input
                type="text"
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                name="password"
              />

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Register
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
