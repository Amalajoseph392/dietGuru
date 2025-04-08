const Recepies= require('../model/recepies');
const path = require('path');

//  ........................... create receipe .................................................

const recepieCreate = async (req, res) => {
    // console.log("In function");

    try {
        const { rec_name, rec_exp, rec_cooking_time, rec_type, rec_ingredients, rec_instructions } = req.body;
        const rec_image = req.file ? `/uploads/${req.file.filename}` : null;

        // Ensure rec_ingredients is parsed as an array
        const ingredientsArray = rec_ingredients ? JSON.parse(rec_ingredients) : [];

        const recepie = new Recepies({
            rec_name,
            rec_exp,
            rec_cooking_time,
            rec_type,
            rec_ingredients: ingredientsArray,
            rec_instructions,
            rec_image
        });

        await recepie.save();

        res.status(201).json({ message: 'Recipe added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};


// ................................. to fetch all the receipes form table ................................................................

const getAllRecepies = async (req, res) => {
    try {
        const recepies = await Recepies.find();
        const updatedRecepies = recepies.map(recipe => ({
            ...recipe._doc,
            rec_image: `http://localhost:5000${recipe.rec_image}`
        }));
        res.status(200).json(updatedRecepies);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};



//  ................ update receipes ......................

const recepieUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        // Extract data from request body
        const {
            rec_name,
            rec_exp,
            rec_cooking_time,
            rec_type,
            rec_ingredients,
            rec_instructions
        } = req.body;

        // Determine the image path (if a new image is uploaded)
        const rec_image = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Parse ingredients string into array if needed
        const ingredientsArray = rec_ingredients
            ? Array.isArray(rec_ingredients)
                ? rec_ingredients
                : JSON.parse(rec_ingredients)
            : [];

        // Build the update object dynamically
        const updatedData = {
            rec_name,
            rec_exp,
            rec_cooking_time,
            rec_type,
            rec_instructions,
            ...(rec_image && { rec_image }),
            ...(ingredientsArray.length > 0 && { rec_ingredients: ingredientsArray }),
        };

        // Update the recipe in the DB
        const updatedRecipe = await Recepies.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe updated successfully', updatedRecipe });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};



// ................................... delete the recipe .........................................................


const deleteRecipeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Attempt to delete the recipe by ID
      const deletedRecipe = await Recepies.findByIdAndDelete(id);
  
      // If no recipe was found with the given ID
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
       

      // Respond with success
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting recipe', error: err.message });
    }
  };
  


module.exports={
    recepieCreate, getAllRecepies, recepieUpdate, deleteRecipeById
}