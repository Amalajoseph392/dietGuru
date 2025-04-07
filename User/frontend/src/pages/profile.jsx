import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaClock, FaUserMd } from 'react-icons/fa';
import Navbar from './navbar'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [assignedDietitian, setAssignedDietitian] = useState(null);

  useEffect(() => {
    const fetchDietitian = async () => {
      try {
        const res = await axios.get(`/api/auth/assigned-dietitian/${user.email}`);
        setAssignedDietitian(res.data);
      } catch (err) {
        console.error('Error fetching dietitian:', err);
      }
    };

    fetchDietitian();
  }, [user.email]);

  return (
    <div>
    <Navbar/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-extrabold text-center text--600 mb-6 text-yellow-400 ">👤 User Profile</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <FaUser className="text-xl text-gray-600" />
          <span className="font-medium text-gray-700">Username:</span>
          <span className="text-gray-900">{user.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-xl text-gray-600" />
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaClock className="text-xl text-gray-600" />
          <span className="font-medium text-gray-700">Login Time:</span>
          <span className="text-gray-900">{user.loginTime}</span>
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🩺 Assigned Dietitian</h3>
        {assignedDietitian ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaUserMd className="text-xl text-gray-600" />
              <span className="font-medium text-gray-700">Name:</span>
              <span className="text-gray-900">{assignedDietitian.dietian_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-xl text-gray-600" />
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{assignedDietitian.email}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No dietitian assigned.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Profile;
