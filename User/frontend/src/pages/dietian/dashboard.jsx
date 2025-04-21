import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DietitianDashboard() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    const fetchAssignedUsers = async () => {
      try {
        const res = await axios.get(`api/auth/get_assign_user/${user.email}`);
        setAssignedUsers(res.data.assigned_users || []);
      } catch (err) {
        console.error('Failed to fetch assigned users:', err);
      }
    };

    if (user?.email) {
      fetchAssignedUsers();
    }
  }, [user?.email]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dietitian Dashboard</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Assigned User Email</th>
          </tr>
        </thead>
        <tbody>
          {assignedUsers.length > 0 ? (
            assignedUsers.map((email, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                No users assigned yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DietitianDashboard;
