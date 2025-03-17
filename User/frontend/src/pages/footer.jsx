import React from 'react';

const Footer = () => {
  return (
    <footer className="container mx-auto bg-emerald-400 rounded-lg text-black py-8 mb-2">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Diet Maestro</h2>
            <p className="text-sm mt-2">Your healthy meal companion</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:underline">
              About Us
            </a>
            <a href="#" className="text-sm hover:underline">
              Contact
            </a>
            <a href="#" className="text-sm hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:underline">
              Terms of Service
            </a>
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
