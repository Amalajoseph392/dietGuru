const express = require('express');
const router = express.Router();
const axios = require('axios');

// Models
const UserInput = require('../model/meal');      // Existing model to store user input
const MealPlan = require('../model/meal_plan');   // New model to store email + plan

// POST: Save user input and get meal plan from Flask
const user_data_meal = async (req, res) => {
  try {
    // 1. Save user input to MongoDB
    const userInputData = new UserInput(req.body);
    await userInputData.save();

    // 2. Prepare data for ML Flask API
    const mlInput = {
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      gender: req.body.gender,
      activity: req.body.activity,
      diet: req.body.diet,
      allergies: req.body.allergies[0] || "", // just sending one allergy
      goal: req.body.goal,
      bmi:req.body.bmi,
    };

    // 3. Check if a meal plan already exists for the provided email
    const existingMealPlan = await MealPlan.findOne({ email: req.body.email });

    if (existingMealPlan) {
      // If a meal plan exists, return the existing one
      return res.status(200).json({
        success: true,
        message: 'Meal plan already exists for this email!',
        existingPlan: existingMealPlan // return the existing meal plan
      });
    }

    // 4. Call Flask ML API to generate a new meal plan
    const mlResponse = await axios.post('http://127.0.0.1:5001/predict', mlInput);
    const generatedPlan = mlResponse.data;

    // 5. Set the mealPlanDate and endAt
    const mealPlanDate = new Date();  // Date when the meal plan is generated
    const endAt = new Date(mealPlanDate);
    endAt.setDate(endAt.getDate() + 7);  // Add 7 days to the mealPlanDate

    // Prepare the plan data before saving it to the database
    const mealPlanData = {
      email: req.body.email,
      plan: generatedPlan,
      mealPlanDate: mealPlanDate,  // mealPlanDate (date when plan was generated)
      endAt: endAt  // endAt (7 days after mealPlanDate)
    };

    // 6. Save email + plan to MealPlan collection
    const savedPlan = new MealPlan(mealPlanData);
    await savedPlan.save();

    // 7. Send response with the newly generated plan
    res.status(200).json({
      success: true,
      message: 'User input saved and new meal plan generated successfully!',
      inputData: userInputData,
      savedPlan,  // saved meal plan with email
      mealPlan: generatedPlan // what came from Flask
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error saving user input or generating meal plan',
      error: error.message
    });
  }
};

// Export controller function
module.exports = {
  user_data_meal
};
