import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './navbar1';
import Topbar from "./topbar1";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import jsPDF from "jspdf";
import "jspdf-autotable";

function Clients() {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  const dietitianEmail = user.email; 
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const res = await axios.get(`/api/auth/assigned-users/${dietitianEmail}`);
        if (res.data?.assigned_users?.length > 0) {
          setAssignedUsers(res.data.assigned_users);
        } else {
          setAssignedUsers([]);
        }
      } catch (error) {
        console.error("Error fetching assigned users:", error);
      }
    };

    fetchAssignedUsers();
  }, [dietitianEmail]);

  // Search filtered data
  const filteredUsers = assignedUsers.filter((email) =>
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // PDF Download function
  const downloadPDF = () => {
    const doc = new jsPDF();
    const table = document.querySelector('#user-table');

    doc.autoTable({
      head: [['Email']],
      body: assignedUsers.map((email) => [email]),
    });

    doc.save('assigned-users.pdf');
  };

  // CSV Download function
  const downloadCSV = () => {
    const headers = ["Email"];
    const rows = assignedUsers.map((email) => [email]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "assigned-users.csv");
    link.click();
  };

  const handleView = (email) => {
    // Navigate to the ViewClient page and pass the email as a URL parameter
    navigate(`/view-client/${email}`);
  };

  return (
    <div className="flex h-screen gap-8">
      <Navbar />
      <div className="flex-1">
        <Topbar />
        <div className="p-8 overflow-auto">
          <h1 className="text-2xl font-bold mb-5">Assigned Users</h1>

          {/* Search, CSV and PDF Buttons */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by email"
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              />
            </div>

            <div className="flex space-x-2">
              {/* CSV Button */}
              <button
                onClick={downloadCSV}
                className="px-4 py-2 bg-blue-500 flex items-center gap-2 rounded-md hover:bg-blue-700 text-white"
              >
                <i className="bi bi-filetype-csv"></i> CSV
              </button>

              {/* PDF Button */}
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-red-400 flex items-center gap-2 rounded-md hover:bg-red-600 text-white"
              >
                <i className="bi bi-file-earmark-pdf"></i> PDF
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table id="user-table" className="table-auto w-full text-md border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-3 text-gray-700">No</th>
                  <th className="px-4 py-3 text-gray-700">Email</th>
                  <th className="px-4 py-3 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                      No assigned users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((email, index) => (
                    <tr key={email} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 transition-colors">
                      <td className="px-4 py-3 text-center">{index + 1}</td>
                      <td className="px-4 py-3">{email}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-x-4">
                          {/* View Button */}
                          <button
                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                            onClick={() => handleView(email)}  // Pass email on click
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
