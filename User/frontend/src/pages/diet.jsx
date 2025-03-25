import React, { useState } from 'react';
import dietImage from '../assets/images/diet.jpg';
import Banana1Image from '../assets/images/pineapple.jpg';
import Navbar from './navbar';
import { Link } from 'react-router-dom';


const Diet = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section>
      <Navbar />
      <div
        className="container mx-auto px-6 relative h-[530px] bg-cover bg-center w-screen mt-1"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center px-4">
        {!isModalOpen && (
          <div className="text-center bg-white rounded-lg shadow-2xl p-6 text-black max-w-lg">
            <img
              src={Banana1Image}
              alt="Health Image"
              className="w-32 h-32 mx-auto mb-6 rounded-lg object-cover"
            />
            <h1 className="text-4xl font-bold mb-6">Discover the Secrets to a Healthier You</h1>
            <p className="text-lg mb-6">
              Take the first step towards a balanced lifestyle with the right diet.
              Let us guide you on your wellness journey.
            </p>
           
             <Link to="/know">
               <button
            
              className="primary-btn mt-4 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition duration-300"
            >
              Start your Journey
            </button> 
            </Link>
          </div>)};
        </div>
      

      {isModalOpen && (
        <div
          className="absolute inset-0  flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white px-6  p-6 rounded-lg max-w-lg "
            onClick={(e) => e.stopPropagation()} >
            <img
            src={Banana1Image}
            alt="Health Image"
            className="w-20 h-20 mx-auto mb-6 rounded-lg object-cover"
          />
          
            <h2 className="text-2xl font-bold mb-4 text-center">Tell us about you!</h2>
            <form>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="height">Height (cm)</label>
                        <input
                        type="number"
                        id="height"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your height"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="weight">Weight (kg)</label>
                        <input
                        type="number"
                        id="weight"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your weight"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="age">Age</label>
                        <input
                        type="number"
                        id="age"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your age"
                        />
                    </div>
                    </div>
                    <div>
              
                     <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="sex">Gender</label>
                        <select
                        id="sex"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    
                      </div>
                      <div className="mb-4">
                        <label className="block text-lg mb-2" htmlFor="exercise">Exercise Level</label>
                        <select
                        id="exercise"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="intense">Intense</option>
                        </select>
                      </div>

                </div>
                    </div>
                    <div className=" text-center">
                <button
                    type="submit"
                    className="primary-btn px-4"
                >
                    Next
                </button>
                    </div>
                
        
        </form>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default Diet;
