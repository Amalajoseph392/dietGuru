import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import Burger from "../assets/images/healthyburger.jpg";


const Login =  () => {




  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center p-6">
          <img src={Burger} alt="Burger" className="w-64 h-64" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Welcome Back!</h2>
          <form className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 pr-10"
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
            </div>

            {/* Links */}
            <div className="flex justify-between">
                <a href="#" className="text-sm text-orange-500 hover:underline">
                <Link to="/signin">Sign In</Link>
                </a>
                <a href="#" className="text-sm text-orange-500 hover:underline">
                    Forgot Password?
                </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
 


}

export default Login;
