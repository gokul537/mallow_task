import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../actions/authActions";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting login process...");
      const response = await dispatch(login(credentials)); 
      console.log("Login response:", response);
  
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
  
      if (token) {
        localStorage.setItem("isAuthenticated", "true");
        console.log("About to navigate...");
        // window.location.href = "/user";
        navigate("/user") ;
        window.location.reload();
      } else {
        console.log("No token found after login");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" max-w-md p-6 bg-white rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="eve.holt@reqres.in"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>

            <div className="relative">
  <input
    type={passwordVisible ? "text" : "password"}
    name="password"
    id="password"
    value={credentials.password}
    onChange={handleInputChange}
    className="w-full px-4 py-2 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
    placeholder="********"
    required
  />
  <div
    // type="button"
    onClick={() => setPasswordVisible(!passwordVisible)}
    className="absolute top-[32px] right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
  >
    {passwordVisible ? <Eye />:<EyeOff /> }
  </div>
</div>

            

          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              <span className="ml-2">Remember me</span>
            </label>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "Logging in..." : "Log in"}
          </motion.button>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
