import React from 'react';
import { useLocation } from 'react-router-dom';
// import { format, addDays } from 'date-fns';
import dietImage from '../assets/images/diet.jpg';
import Navbar from './navbar';


const Result = () => {
  const location = useLocation();
  const { mealPlan, input } = location.state || {};

  if (!mealPlan || !input) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100 text-gray-700">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <p className="text-xl font-semibold">No meal plan found. Please submit your data first.</p>
        </div>
      </div>
    );
  }

  const today = new Date();

  // Calculate total calories for 7 days
  let totalCalories = 0;
  Object.values(mealPlan).forEach(day => {
    totalCalories +=
      (parseInt(day.breakfast_cal) || 0) +
      (parseInt(day.lunch_cal) || 0) +
      (parseInt(day.dinner_cal) || 0);
  });

  // Daily average
  const avgDailyCalories = Math.round(totalCalories / 7);

  // Determine goal and expected weekly impact
  let goalText = '';
  let calorieAdjustment = 0;

  switch (input.goal) {
    case 'weight_loss':
      goalText = 'Weight Loss';
      calorieAdjustment = -3500; // Roughly 500 deficit/day × 7 = ~1 lb/week
      break;
    case 'weight_gain':
      goalText = 'Weight Gain';
      calorieAdjustment = 3500; // Surplus
      break;
    case 'maintain':
    default:
      goalText = 'Maintain Weight';
      calorieAdjustment = 0;
  }

  const expectedCalories = totalCalories + calorieAdjustment;

  return (
    <div className="relative min-h-screen">
      {/* Background Image Section */}
      <Navbar/>
      <div
        className="container mx-auto px-6 relative  bg-cover bg-center w-screen mt-1"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
      <h1 className="text-3xl font-bold text-emerald-700 mb-4 text-center">🍽️ Your 7-Day Meal Plan</h1>

      {/* Analysis section */}
      <div className="bg-white shadow-md p-6 mb-6 rounded-xl border border-gray-200 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">📊 Analysis Summary</h2>
        <p className="text-gray-700 mb-1"><strong>Goal:</strong> {goalText}</p>
        <p className="text-gray-700 mb-1"><strong>Total Calories Planned (7 Days):</strong> {totalCalories} kcal</p>
        <p className="text-gray-700 mb-1"><strong>Average Daily Intake:</strong> {avgDailyCalories} kcal/day</p>
        {input.goal !== 'maintain' && (
          <p className="text-gray-700">
            <strong>Calorie to {input.goal === 'weight_loss' ? 'burn' : 'gain'}:</strong> {Math.abs(calorieAdjustment)} kcal/week
          </p>
        )}
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(mealPlan).map(([_, meals], index) => {
          const date = format(addDays(today, index + 1), 'EEEE, MMMM do');
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 {date}</h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold text-emerald-600">🍳 Breakfast:</span> {meals.breakfast}{' '}
                  <span className="text-sm text-gray-500">({meals.breakfast_cal} kcal)</span>
                </p>
                <p>
                  <span className="font-semibold text-emerald-600">🥗 Lunch:</span> {meals.lunch}{' '}
                  <span className="text-sm text-gray-500">({meals.lunch_cal} kcal)</span>
                </p>
                <p>
                  <span className="font-semibold text-emerald-600">🍛 Dinner:</span> {meals.dinner}{' '}
                  <span className="text-sm text-gray-500">({meals.dinner_cal} kcal)</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Result;
