import React, { useState } from 'react';


const Navbar = () => {

    const [isMenuOpen,setIsMenuOpen]=useState(false)
  return (
    <header className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white">

     <div className="text-2xl font-bold">
        Diet<span className="text-orange-400">Maestroo</span>

     </div>
     
     <ul className='hidden xl:flex items-center gap-12 font-semifold text-base'>
        <li className="p-2 hover:bg-orange-400 hover:text-white rounded-md transition-all cursor-pointer">Home</li>
        <li className="p-2 hover:bg-orange-400 hover:text-white rounded-md transition-all cursor-pointer">Recepies</li>
        <li className="p-2 hover:bg-orange-400 hover:text-white rounded-md transition-all cursor-pointer">Diet plan</li>
        <li className="p-2 hover:bg-orange-400 hover:text-white rounded-md transition-all cursor-pointer">About Us</li>

     </ul>
     <div className='hidden xl:flex items-center  font-bold text-base'>
        <button className="p-2 text-orange-400 border-1 rounded-2xl border-amber-400 cursor-pointer">Login</button>
       
     </div>

     <i 
  className="bx bx-menu text-5xl cursor-pointer hidden xl:block" 
  onClick={() => setIsMenuOpen(!isMenuOpen)}
></i>


   <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semifold text-lg transform transition-transform ${isMenuOpen ? "opacity-100":"opacity-0"}`}>
   </div>

    </header>
  );
}

export default Navbar;
