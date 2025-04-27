import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import dietImage from '../assets/images/hero.jpg';

const Status = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [actualDiet, setActualDiet] = useState(
    Array(7).fill(null).map(() => ({ breakfast: '', breakfast_grams: '', lunch: '', lunch_grams: '', dinner: '', dinner_grams: '', submitted: false, error: '' }))
  );

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/auth/meal-plan/${user.email}`);
        console.log('API Response:', res.data); // Log the response to check structure

        const planData = res.data.mealPlan;
        setMealPlan(planData);

        if (planData.actual_plan) {
          const filledActual = Array(7).fill(null).map(() => ({ breakfast: '', breakfast_grams: '', lunch: '', lunch_grams: '', dinner: '', dinner_grams: '', submitted: false }));

          // Check if the actual_plan exists for each day and populate
          Object.entries(planData.actual_plan).forEach(([dayKey, meals]) => {
            const index = parseInt(dayKey.replace('day', '')) - 1;
            if (index >= 0 && index < 7) {
              filledActual[index] = { 
                breakfast: meals.breakfast || '',
                breakfast_grams: meals.breakfast_grams || '',
                lunch: meals.lunch || '',
                lunch_grams: meals.lunch_grams || '',
                dinner: meals.dinner || '',
                dinner_grams: meals.dinner_grams || '',
                comment:meals.comment,
                submitted: true 
              };
            }
          });
          setActualDiet(filledActual);
        }
      } catch (err) {
        console.error('Error fetching meal plan:', err);
      }
    };

    fetchUser();
  }, [user.email]);

  const handleActualChange = (index, field, value) => {
    const regex = /^[A-Za-z\s]*$/;  // Regex to allow only letters and spaces
    if ((field.includes('grams') && !isNaN(value)) || regex.test(value) || value === '') {
      const updated = [...actualDiet];
      updated[index] = { ...updated[index], [field]: value };  // Update only the relevant day
      updated[index].error = ''; // Clear error if input is valid
      setActualDiet(updated);
    } else {
      const updated = [...actualDiet];
      updated[index] = { ...updated[index], error: 'Only valid numbers or letters and spaces are allowed!' };  // Ensure other days aren't affected
      setActualDiet(updated);
    }
  };

  const handleSubmitActual = async (index) => {
    const dayKey = `day${index + 1}`;
    const entry = actualDiet[index];

    try {
      const updatedDiet = [...actualDiet];
      updatedDiet[index] = { ...updatedDiet[index], submitted: true }; // Mark as submitted for that day
      setActualDiet(updatedDiet);

      await axios.put(`/api/auth/meal-plan/${user.email}/actual/${dayKey}`, entry);
      alert(`Actual meal for ${dayKey} saved successfully!`);
    } catch (error) {
      console.error('Error saving actual diet:', error);
      alert('Failed to save actual meal.');
    }
  };

  const renderMealCard = (day, meals, index) => (
    <div key={day} className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{`Day ${index + 1}`}</h3>
      <p><strong>Breakfast:</strong> {meals.breakfast} - {meals.breakfast_cal} cal - {meals.breakfast_grams}g</p>
      <p><strong>Lunch:</strong> {meals.lunch} - {meals.lunch_cal} cal - {meals.lunch_grams}g</p>
      <p><strong>Dinner:</strong> {meals.dinner} - {meals.dinner_cal} cal - {meals.dinner_grams}g</p>
    </div>
  );

  const renderActualInput = (dayIndex) => (
    <div key={dayIndex} className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{`Day ${dayIndex + 1}`}</h3>
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Breakfast"
        value={actualDiet[dayIndex].breakfast}
        onChange={(e) => handleActualChange(dayIndex, 'breakfast', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
      <input
        type="number"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Breakfast Grams"
        value={actualDiet[dayIndex].breakfast_grams}
        onChange={(e) => handleActualChange(dayIndex, 'breakfast_grams', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Lunch"
        value={actualDiet[dayIndex].lunch}
        onChange={(e) => handleActualChange(dayIndex, 'lunch', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
      <input
        type="number"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Lunch Grams"
        value={actualDiet[dayIndex].lunch_grams}
        onChange={(e) => handleActualChange(dayIndex, 'lunch_grams', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
      <input
        type="text"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Dinner"
        value={actualDiet[dayIndex].dinner}
        onChange={(e) => handleActualChange(dayIndex, 'dinner', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
      <input
        type="number"
        className="w-full p-2 mb-2 border border-gray-300 rounded"
        placeholder="Dinner Grams"
        value={actualDiet[dayIndex].dinner_grams}
        onChange={(e) => handleActualChange(dayIndex, 'dinner_grams', e.target.value)}
        disabled={actualDiet[dayIndex].submitted}
      />
            
            
    <p><strong>Comment:</strong> {actualDiet[dayIndex].comment} </p>



      {actualDiet[dayIndex].error && (
        <p className="text-red-500 text-sm">{actualDiet[dayIndex].error}</p>
      )}
      <button
        className={`mt-2 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-400 ${
          actualDiet[dayIndex].submitted ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={() => handleSubmitActual(dayIndex)}
        disabled={actualDiet[dayIndex].submitted || Boolean(actualDiet[dayIndex].error)}
      >
        Submit
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div
        className="bg-cover bg-center min-h-screen w-full pt-6"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-center gap-8">
          {/* Meal Plan Section */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Your 7-Day Meal Plan</h2>
            <div className="overflow-y-auto">
              {mealPlan && mealPlan.plan && mealPlan.plan.meal_plan ? (
                Object.entries(mealPlan.plan.meal_plan).map(([day, meals], index) =>
                  renderMealCard(day, meals, index)
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Actual Diet Section */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Actual Diet</h2>
            <div className="overflow-y-auto">
              {Array.from({ length: 7 }).map((_, index) =>
                renderActualInput(index)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
