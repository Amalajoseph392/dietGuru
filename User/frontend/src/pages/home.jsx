import React from 'react'
import Navbar from './navbar'
import Types from './types'
import About from './about'
import Footer from './footer'
import heroImage from '../assets/images/hero.jpg';



function home() {
  return (
   <section className="bg-white  overflow-y-auto relative">
    <Navbar/>
    <div className='min-h-full'>
        <div className="container mx-auto mt-1 grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            <div className=" bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
            

            </div>
            <div className="mt-24 flex flex-col text-center ">
                <h1 className='text-3xl md:text-4xl whitespace-nowrap font-bold'>Discover the perfect <span className='text-emerald-400 hover:text-yellow-400'>meal plan!</span> </h1>
                <p class="mt-4 text-lg font-semibold px-4 sm:px-8 lg:px-16">Unlock your full potential with a tailored meal plan designed just for you. Our carefully crafted plans provide balanced nutrition to fuel your body and help you achieve your specific health goals. Start your journey today and experience the benefits of a healthier, more energized lifestyle!</p>
                <div>
                    <button className='sec-btn mt-4'>Explore</button>
                </div>
            </div>


        


        </div>
        <Types/>
        <About/>
        <Footer/>
    </div>
    

   </section>

  )
}

export default home