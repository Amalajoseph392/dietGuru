const mongoose = require('mongoose');

const UserInputSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  height_cm: {
    type: Number,
    required: true,
  },
  weight_kg: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  activity_level: {
    type: String,
    enum: ['none', 'light', 'moderate', 'intense'],
    required: true,
  },
  diet_preference: {
    type: String,
    enum: ['keto', 'vegan', 'paleo', 'mediterranean'],
    required: true,
  },
  allergies: {
    type: [String], 
    default: [],
  },
  goals: {
    type: String,
    enum: ['weight_loss', 'weight_gain', 'maintain'],
    default: 'maintain',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('UserInput', UserInputSchema,'user_input');
