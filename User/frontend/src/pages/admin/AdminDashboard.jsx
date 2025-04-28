import React, { useState,useEffect } from "react";
import Navbar from "./navbar";
import Topbar from "./topbar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaUser, FaUserMd } from "react-icons/fa";


const COLORS = ["#34d399", "#facc15"]; 

const AdminDashboard = () => {

  const [totalCount, setTotalCount] = useState(0);
  const [dietitian, setDietitian] = useState(0);
  const [mealCount, setMealCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/auth/totalCount"); 
        const data = await response.json();

        
        setTotalCount(data.totalCount);
        setDietitian(data.dietitianCount);
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchMealCount = async () => {
      try {
        
        const response = await fetch("/api/auth/getTotalMealPlansCount"); 
        const data = await response.json();

        setMealCount(data.totalMealPlans); 
      } catch (error) {
        console.error("Error fetching total meal plans:", error);
      }
    };

    fetchMealCount();
  }, []);

  // Dynamically update bar data based on fetched data
  const barData = [
    { name: "Users", count: totalCount - dietitian }, 
    { name: "Meal Plans", count: mealCount },
  ];

  const pieData = [
    { name: "Users", value: totalCount - dietitian }, 
    { name: "Dietitians", value: dietitian },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />

      <div className="flex-1">
      
        <Topbar /> 
        <h1 className="text-3xl font-bold  mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-yellow-400">
            <FaUser className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-xl font-bold text-gray-800">{totalCount}</h2>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4 border-l-4 border-yellow-400">
            <FaUserMd className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-gray-500">Total Dietitians</p>
              <h2 className="text-xl font-bold text-gray-800">{dietitian}</h2>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Users vs Meal Plan Opt-Ins
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#34d399" /> {/* yellow-400 */}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              User Role Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
