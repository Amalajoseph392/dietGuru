import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container mx-auto px-6 bg-black  rounded-lg text-yellow-400 py-14">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Diet Maestro</h2>
            <p className="text-sm mt-2">Your healthy meal companion</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="text-sm hover:underline">
              Contact
            </Link>
            <Link to="/RecipePage" className="text-sm hover:underline">
             Recipes 
            </Link>
            
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs">&copy; 2025 Diet Maestro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
