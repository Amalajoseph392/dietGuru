import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

const NavbarMenu=[
    {
        id:1,
        title:"Home",
        path:"/",
    },
    {
        id:2,
        title:"Diet Plan",
        path:"diet",
    },
    {
        id:3,
        title:"Recepies",
        path:"/recipies",
    },
    {
        id:4,
        title:"About Us",
        path:"/about",
    },
]

function navbar() {
  return (
   
    <nav>
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
            <div>
                <h1 className="font-bold text-2xl">Diet<span className="font-bold text-2xl text-yellow-400 hover:text-emerald-400">Maestro</span></h1>
            </div>
            <div className="hidden lg:block">
                <ul className="flex items-center gap-3">
                    {NavbarMenu.map((menu) => (
                        <li key={menu.id}>
                            <a href={menu.path} className='inline-block py-3 px-3 hover:text-orange-400 relative-group'>
                                <div className="w-2 h-2 bg-orange-400 absolute mt-2 rounded-full left-1/2 -transalte-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                                {menu.title}</a>
                        </li>

                    ))}
            <Link to="/login">
              <button className="primary-btn">Sign In</button>
            </Link>
                </ul> 

            </div>
            <div className="lg:hidden">
                <IoMdMenu className="text-4xl"></IoMdMenu>

            </div>

        </div>
    
    
    </nav>
  );
};


export default navbar