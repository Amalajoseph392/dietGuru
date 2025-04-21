// model/mealPlan.js
const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  email: { type: String, required: true },
  plan: { type: Object, required: true },
  actual_plan:{type:Object},
  createdAt: { type: Date, default: Date.now },
  endAt: { type: Date } // this will be set manually
});

module.exports = mongoose.model('MealPlan', mealPlanSchema,'meal_plans');

