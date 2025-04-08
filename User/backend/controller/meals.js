const express = require('express');
const router = express.Router();
const UserInput = require('../model/meal');




const user_data_meal=async (req,res)=>{
    try {
        const userInputData = new UserInput(req.body);
        await userInputData.save();
        res.status(200).json({
          success: true,
          message: 'User input saved successfully!',
          data: userInputData
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error saving user input',
          error: error.message
        });
      }


}

module.exports={
    user_data_meal,
   
}