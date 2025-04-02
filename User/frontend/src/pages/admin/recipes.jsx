 import React, { useState,useEffect } from "react";
 import axios from "axios";
 import Navbar from './navbar';
 
 function recepies() {
      const [showModal, setShowModal] = useState(false);
    

     const [recipes, setRecipes] = useState([
        { name: "Spaghetti Bolognese", description: "A classic Italian pasta dish with a rich, meaty sauce." },
        { name: "Chicken Tikka Masala", description: "A flavorful curry with marinated chicken in a creamy tomato sauce." },
        { name: "Vegetable Stir Fry", description: "A quick and healthy dish with fresh veggies and soy sauce." },
      ]);
       const [newRecipe, setNewRecipe] = useState({
        name: "",
        description: "",
        cookingTime: "",
        ingredients: "",
        instructions: "",
        image: null,
        fileName: null,
        previewImage: ""
          
        });



        const handleAddRecipe = async () => {
          if (!newRecipe.name || !newRecipe.description || !newRecipe.cookingTime || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.image) {
            alert("Please fill out all fields and upload an image.");
            return;
          }
        
          const formData = new FormData();
          formData.append("rec_name", newRecipe.name);
          formData.append("rec_exp", newRecipe.description);
          formData.append("rec_cooking_time", newRecipe.cookingTime);
          formData.append("rec_ingredients", newRecipe.ingredients);
          formData.append("rec_instructions", newRecipe.instructions);
          formData.append("rec_image", newRecipe.image);
        
          try {
            const response = await axios.post("http://localhost:5173/api/auth/recepies-create", 
              formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        
            if (response.status === 201) {
              alert("Recipe added successfully!");
              setNewRecipe({ name: "", description: "", cookingTime: "", ingredients: "", instructions: "", image: null, fileName: null, previewImage: "" });
              setShowModal(false);
            }
          } catch (error) {
            console.error("Error adding recipe:", error);
            alert("An error occurred. Please try again.");
          }
        };
        
        
   return (
  
    <div className="flex h-screen gap-8">
    <Navbar/>
    <div className="flex-1 p-6 overflow-auto">
      
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-5">Recipes</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Add Recipe
      </button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {recipes.map((recipe, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-300"
        >
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
          )}
          <h2 className="text-xl font-bold">{recipe.name}</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      ))}
    </div>

    {/* Modal */}
    {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddRecipe(); }}>
                <input type="text" placeholder="Recipe Name" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
                <textarea placeholder="Description" value={newRecipe.description} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2"></textarea>
                <input type="number" placeholder="Cooking Time (mins)" value={newRecipe.cookingTime} onChange={(e) => setNewRecipe({ ...newRecipe, cookingTime: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
                <input type="text" placeholder="Ingredients (comma separated)" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
                <textarea placeholder="Instructions" value={newRecipe.instructions} onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2"></textarea>
                <div className="mb-2">
                  <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => document.getElementById("fileInput").click()}>Browse File</button>
                  <input id="fileInput" type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setNewRecipe({ ...newRecipe, image: file, fileName: file.name, previewImage: URL.createObjectURL(file) }); } }} className="hidden" />
                </div>
                {newRecipe.previewImage && <img src={newRecipe.previewImage} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />}
                
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Cancel</button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Recipe</button>
                </div>
              </form>
            </div>
          </div>
        )}
  </div> 
  </div>  )
 }
 
 export default recepies