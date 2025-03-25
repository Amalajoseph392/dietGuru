import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import Burger from "../assets/images/healthyburger.jpg";


function signIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""


  });

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const registerUser=async(e)=>{
    e.preventDefault(); 
    if(formData.password!==formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }
    try{
      console.log("am in reg fun");
      
      const result=await axios.post("/api/auth/register",{
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      console.log("got result");
      
      if(result)
      {
        alert(result.data.message);
      }
    }catch(error){
      console.error("Unsuccessful registration",error);
      
      
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center p-6">
          <img src={Burger} alt="Burger" className="w-64 h-64" />
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Create Your Account</h2>
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your name" onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your email" onChange={handleChange}
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
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 pr-10"
                  placeholder="Create a password" onChange={handleChange}
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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                   name="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 pr-10"
                  placeholder="Confirm your password" onChange={handleChange}
                />
              </div>
            </div>

            {/* Links */}
            <div className="flex justify-between">
              <Link to="/login" className="text-sm text-orange-500 hover:underline">
                Already have an account?
              </Link>
            </div>


            {/* Submit Button */}
            <button
              type="submit" onClick={registerUser}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signIn;
