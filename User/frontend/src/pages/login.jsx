import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Burger from "./assets/images/healthyburger.jpg";

const Login =  () => {




  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-6">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
         
          <img
            src={Burger}
            alt="Burger"
            className="w-32 h-32"
          />
        </div>
        {/* Form */}
        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-teal-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-teal-600 focus:ring-2 focus:ring-teal-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );



}

export default Login;
