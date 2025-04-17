const express = require('express');
const router = express.Router();
const axios = require('axios');
const UserInput = require('../model/meal'); // your MongoDB model

// POST: Save user input and get meal plan from Flask
const user_data_meal = async (req, res) => {
  try {
    // 1. Save user input to MongoDB
    const userInputData = new UserInput(req.body);
    await userInputData.save();

    const mlInput = {
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      gender: req.body.gender,
      activity: req.body.activity,
      diet: req.body.diet,
      allergies: req.body.allergies[0] || "", // send one allergy for now
      goal: req.body.goal
    };

    console.log("diet", mlInput)

    // 2. Call Flask ML API with the same user input
    const mlResponse = await axios.post('http://127.0.0.1:5001/predict', mlInput);

    // 3. Return success response with meal plan
    res.status(200).json({
      success: true,
      message: 'User input saved and meal plan generated successfully!',
      inputData: userInputData,
      mealPlan: mlResponse.data // response from Flask
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

// Export the function to use in route
module.exports = {
  user_data_meal
};
