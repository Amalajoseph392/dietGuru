import React from "react";
import Navbar from './navbar';

const AdminDashboard = () => {


  return (
    <div className="flex h-screen">
      <Navbar/>
      
      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold">Admin Panel Content</h1>
        <p>This is the admin panel content area where you can manage users and recipes.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
