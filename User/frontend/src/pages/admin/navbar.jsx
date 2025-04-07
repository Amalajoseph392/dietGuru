import React, { useState } from "react";
import { Link } from "react-router-dom"; 

function navbar() {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="flex h-screen">
    <div
      className={`${
        isMobileMenuOpen ? "block" : "hidden"
      } lg:block w-64 bg-gray-800 text-white p-4 flex flex-col`}
    >
      <div className="text-xl font-bold mb-6">Diet Maestro Admin Panel</div>
      <nav>
        <ul>
          <li>
            <Link
              to="/AdminDashboard"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/AdminUsers"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/AdminRecipes"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link
              to="/AdminDietian"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Dietitian
            </Link>
          </li>
        </ul>
      </nav>
    </div>

    {/* Hamburger Button (Mobile) */}
    <button
      className="lg:hidden p-4 text-white bg-gray-800"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      <span className="text-xl">&#9776;</span>
    </button>
</div>
  )
}

export default navbar