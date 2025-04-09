import React from 'react'
import Navbar from './navbar'

import aboutImage from '../assets/images/about.jpg';



function about() {
  return (
   <section className="bg-white relative mb-18">
    
   <Navbar/>
    <h1 className="text-4xl justify-center text-center font-bold  pb-10"> About Us</h1>

        <div className="container mx-auto px-6 mt-1 grid grid-cols-1 md:grid-cols-2 min-h-[350px]">


           
            <div className="mt-4 flex flex-col text-center ">
                <h1 className='text-3xl md:text-4xl whitespace-nowrap font-bold'>Know about <span className='text-yellow-400 hover:text-emerald-400'>Diet Maestro!</span> </h1>
                <p class="mt-4 text-lg font-semibold px-4 sm:px-8 lg:px-16">At Diet Maestro, we believe that eating well should be easy, enjoyable, and tailored to your lifestyle. Whether you're looking to lose weight, boost energy, or simply enjoy healthier meals, we provide personalized meal plans designed to meet your unique goals.

Our team of nutritionists, chefs, and wellness experts are passionate about creating balanced, delicious, and nutritious meals that fit into your daily routine. We know how challenging it can be to figure out what to eat, so we've done the hard work for you — crafting a variety of meal plans to suit different dietary preferences, restrictions, and tastes.</p>
                
            </div>
            <div className=" bg-cover bg-center" style={{ backgroundImage: `url(${aboutImage})` }}>

            

            </div>


        


        </div>
        

    

   </section>

  )
}

export default about