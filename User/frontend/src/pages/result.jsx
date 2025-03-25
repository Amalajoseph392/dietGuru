import React from 'react';
import dietImage from '../assets/images/diet.jpg';
import Navbar from './navbar';


function Result() {
  const mealRecommendations = [
    {
      day: 'Day 1',
      meals: [
        { name: 'Breakfast: Avocado Toast', calories: 300, description: 'Whole grain toast with mashed avocado and a poached egg' },
        { name: 'Lunch: Grilled Chicken Salad', calories: 400, description: 'Grilled chicken breast with mixed greens and balsamic vinaigrette' },
        { name: 'Dinner: Baked Salmon', calories: 500, description: 'Baked salmon with steamed broccoli and quinoa' }
      ],
      totalCalories: 1200
    },
    {
      day: 'Day 2',
      meals: [
        { name: 'Breakfast: Smoothie Bowl', calories: 350, description: 'Smoothie bowl with banana, strawberries, and chia seeds' },
        { name: 'Lunch: Turkey and Avocado Wrap', calories: 450, description: 'Whole wheat wrap with turkey, avocado, lettuce, and tomato' },
        { name: 'Dinner: Grilled Shrimp Tacos', calories: 500, description: 'Grilled shrimp in corn tortillas with slaw and salsa' }
      ],
      totalCalories: 1300
    },
    {
      day: 'Day 3',
      meals: [
        { name: 'Breakfast: Greek Yogurt with Berries', calories: 250, description: 'Greek yogurt topped with mixed berries and honey' },
        { name: 'Lunch: Quinoa Salad with Chickpeas', calories: 400, description: 'Quinoa, chickpeas, cucumber, tomato, and feta cheese' },
        { name: 'Dinner: Beef Stir Fry', calories: 550, description: 'Beef stir fry with vegetables and brown rice' }
      ],
      totalCalories: 1200
    },
    {
      day: 'Day 4',
      meals: [
        { name: 'Breakfast: Oatmeal with Almond Butter', calories: 350, description: 'Oatmeal topped with almond butter and banana slices' },
        { name: 'Lunch: Grilled Chicken Wrap', calories: 450, description: 'Grilled chicken, hummus, and veggies in a whole wheat wrap' },
        { name: 'Dinner: Baked Cod with Asparagus', calories: 500, description: 'Baked cod with roasted asparagus and mashed sweet potatoes' }
      ],
      totalCalories: 1300
    },
    {
      day: 'Day 5',
      meals: [
        { name: 'Breakfast: Scrambled Eggs with Spinach', calories: 300, description: 'Scrambled eggs with spinach and mushrooms' },
        { name: 'Lunch: Tuna Salad', calories: 400, description: 'Tuna mixed with avocado, cucumber, and olive oil dressing' },
        { name: 'Dinner: Grilled Steak with Sweet Potato', calories: 600, description: 'Grilled steak with a side of roasted sweet potato' }
      ],
      totalCalories: 1300
    }
  ];

  return (
    <section>
        <Navbar/>
     <div
            className="container mx-auto px-6 relative  bg-cover bg-center w-screen mt-1"
            style={{ backgroundImage: `url(${dietImage})` }}
          >
      <div className=" bg-opacity-80 min-h-screen py-16 px-4 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl text-center font-bold text-black mb-8">
            Recommended <span className='text-yellow-400'>meal plan</span>
          </h1>
          <p className="text-xl text-center text-black  text-semibold mb-12">
            Based on your preferences and goals, here's a 5-day meal plan to help you achieve your desired results.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {mealRecommendations.map((day, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-72"
              >
                <h2 className="text-xl text-center font-semibold text-black mb-4">
                  {day.day}
                </h2>
                <div>
                  {day.meals.map((meal, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="font-semibold text-yellow-400">{meal.name}</h3>
                      <p className="text-gray-600">{meal.description}</p>
                      <p className="font-semibold text-black">Calories: {meal.calories}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-center font-bold text-gray-800 mt-6">
                  Total Calories: {day.totalCalories}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default Result;
