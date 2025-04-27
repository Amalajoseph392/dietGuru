import React, { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import dietImage from '../assets/images/diet.jpg';
import Navbar from './navbar';
import axios from 'axios';

const Result = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [userGoal, setUserGoal] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data, including BMI
        const res = await axios.get(`/api/auth/meal-plan/${user.email}`);
        const planData = res.data.mealPlan?.plan?.meal_plan;
        const bmi = res.data.mealPlan?.plan?.bmi; // Assuming 'bmi' is part of the response
        
        if (planData) {
          setMealPlan(planData);
        } else {
          console.error('Meal plan data is not available.');
        }

        if (bmi !== undefined) {
          let goal = 'maintain'; // Default goal
          if (bmi < 18.5) {
            goal = 'weight_gain'; // Underweight
          } else if (bmi > 24.9) {
            goal = 'weight_loss'; // Overweight
          }
          setUserGoal(goal); // Set the goal based on BMI
        } else {
          console.error('BMI data is not available.');
        }
      } catch (err) {
        console.error('Error fetching meal plan and BMI:', err);
      }
    };

    if (user?.email) {
      fetchUserData();
    }
  }, [user.email]);

  // If no meal plan or goal is available, show fallback
  if (!mealPlan || !userGoal) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-yellow-100 text-gray-700">
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <p className="text-xl font-semibold">No meal plan or goal data found. Please submit your data first.</p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();
  const planStartDate = format(today, 'MMMM dd, yyyy');
  const planEndDate = format(addDays(today, 6), 'MMMM dd, yyyy');

  // Calculate total calories for 7 days
  let totalCalories = 0;
  Object.values(mealPlan).forEach(meals => {
    totalCalories += (parseInt(meals.breakfast_cal) || 0) + (parseInt(meals.lunch_cal) || 0) + (parseInt(meals.dinner_cal) || 0);
  });

  // Daily average
  const avgDailyCalories = Math.round(totalCalories / 7);

  // Determine goal and expected weekly impact based on BMI
  let goalText = '';
  let calorieAdjustment = 0;
  let goalMessage = '';

  switch (userGoal) {
    case 'weight_loss':
      goalText = 'Weight Loss';
      calorieAdjustment = -3500; // Roughly 500 deficit/day × 7 = ~1 lb/week
      goalMessage = 'You are currently overweight. This plan is designed to help you lose weight.';
      break;
    case 'weight_gain':
      goalText = 'Weight Gain';
      calorieAdjustment = 3500; // Surplus
      goalMessage = 'You are currently underweight. This plan is designed to help you gain weight.';
      break;
    case 'maintain':
    default:
      goalText = 'Maintain Weight';
      calorieAdjustment = 0;
      goalMessage = 'You are maintaining your current weight. This plan helps you stay balanced.';
  }

  const expectedCalories = totalCalories + calorieAdjustment;

  return (
    <div className="relative min-h-screen">
      {/* Background Image Section */}
      <Navbar />
      <div
        className="container mx-auto px-6 relative bg-cover bg-center w-screen mt-1"
        style={{ backgroundImage: `url(${dietImage})` }}
      >
        <h1 className="text-3xl font-bold text-emerald-700 mb-4 text-center">🍽️ Your 7-Day Meal Plan</h1>

        {/* Analysis section */}
        <div className="bg-white shadow-md p-6 mb-6 rounded-xl border border-gray-200 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">📊 Analysis Summary</h2>
          <p className="text-gray-700 mb-1"><strong>Goal:</strong> {goalText}</p>
          <p className="text-gray-700 mb-1"><strong>Total Calories Planned (7 Days):</strong> {totalCalories} kcal</p>
          <p className="text-gray-700 mb-1"><strong>Average Daily Intake:</strong> {avgDailyCalories} kcal/day</p>
          {userGoal !== 'maintain' && (
            <p className="text-gray-700">
              <strong>Calorie to {userGoal === 'weight_loss' ? 'burn' : 'gain'}:</strong> {Math.abs(calorieAdjustment)} kcal/week
            </p>
          )}
          {/* Displaying personalized goal message */}
          <p className="text-gray-700 mb-1"><strong>Plan Start Date:</strong> {planStartDate}</p>
          <p className="text-gray-700 mb-1"><strong>Plan End Date:</strong> {planEndDate}</p>
          <p className="text-gray-700 mt-2 font-semibold">{goalMessage}</p>
        
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(mealPlan).map(([dayKey, meals], index) => {
            const date = format(addDays(today, index), 'EEEE, MMMM dd');
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 transition-transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 {date}</h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold text-emerald-600">🍳 Breakfast:</span> {meals.breakfast} 
                    <span className="text-sm text-gray-500"> ({meals.breakfast_grams}g, {meals.breakfast_cal} kcal)</span>
                  </p>
                  <p>
                    <span className="font-semibold text-emerald-600">🥗 Lunch:</span> {meals.lunch} 
                    <span className="text-sm text-gray-500"> ({meals.lunch_grams}g, {meals.lunch_cal} kcal)</span>
                  </p>
                  <p>
                    <span className="font-semibold text-emerald-600">🍛 Dinner:</span> {meals.dinner} 
                    <span className="text-sm text-gray-500"> ({meals.dinner_grams}g, {meals.dinner_cal} kcal)</span>
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
