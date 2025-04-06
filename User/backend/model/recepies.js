const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  rec_name: { type: String, required: true, unique: true },
  rec_exp: { type: String, required: true },
  rec_cooking_time: { type: String, required: true },
  rec_type: { type: String, required: true },
  rec_ingredients: { type: [String], required: true },
  rec_instructions: { type: String, required: true },
  rec_image: { type: String, required: true },
});

module.exports = mongoose.model("Recipes", recipeSchema, "recepies-create");
