import React, { useState, useContext } from 'react';
import dietImage from '../assets/images/diet.jpg';
import Banana1Image from '../assets/images/pineapple.jpg';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Diet = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to toggle modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleStartJourney = async () => {
    const user = JSON.parse(sessionStorage.getItem('user')); // Retrieve the full user object
    if (!user || !user.email) {
      toast.error('User email not found');
      return;
    }
  
    try {
      const res = await axios.get(`/api/auth/meal-plan/${user.email}`);
      
      // If no meal plan is found, we get a 404 response
      if (res.status === 404 || !res.data.mealPlan) {
        navigate('/know'); // Navigate to the appropriate page
      } else {
        navigate('/result');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate('/know');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
      console.error('Error checking meal plan:', error);
    }
  };
  

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
              <button
                onClick={handleStartJourney}
                className="primary-btn mt-4 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-80 transition duration-300"
              >
                Start your Journey
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Diet;
