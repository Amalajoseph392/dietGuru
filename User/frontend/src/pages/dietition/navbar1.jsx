import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaUtensils, FaUserMd, FaBars } from "react-icons/fa";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (

    <div className="flex h-screen bg-white text-gray-800">
      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:block w-64 bg-white border-r border-gray-200 p-4 shadow-md`}
      >
        <div className="text-2xl font-bold  mb-8">
          Diet<span className="text-yellow-400">Maestro</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/client"
                className="flex items-center gap-3 py-2 px-4 rounded hover:bg-yellow-100"
              >
                 <FaUsers />
                My clients
              </Link>
            </li>
          
          </ul>
        </nav>
      </div>


      {/* Hamburger Button (Mobile) */}
      <button
        className="lg:hidden absolute top-4 left-4 p-2 text-gray-800 bg-white border rounded shadow"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* Main content placeholder */}
      <div className="flex-1 p-4">
        {/* Your main content will render here */}
      </div>
    </div>
  );
}

export default Navbar;
