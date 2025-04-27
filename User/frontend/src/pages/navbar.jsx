import React, { useState, useEffect } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const NavbarMenu = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Diet Plan', path: '/diet' },
  { id: 3, title: 'Recipes', path: '/recipies' },
  { id: 4, title: 'About Us', path: '/about' },
];

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');

    setUser(null);
    setShowDropdown(false);
  
    navigate('/');
  
    window.location.reload();

  };

  const isLoggedIn = !!user;

  return (
    <nav>
      <div className="container  mx-auto px-6 py-2 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">
            Diet
            <span className="text-yellow-400 hover:text-emerald-400">Maestro</span>
          </h1>
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <Link to={menu.path} className="inline-block py-3 px-3 hover:text-orange-400">
                  {menu.title}
                </Link>
              </li>
            ))}

            {!isLoggedIn ? (
              <Link to="/signIn">
                <button className="primary-btn">Sign In</button>
              </Link>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <FaUserCircle className="text-2xl text-gray-600" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </div>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/status_log" className="block px-4 py-2 hover:bg-gray-100">
                      Status Log
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </ul>
        </div>

        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
