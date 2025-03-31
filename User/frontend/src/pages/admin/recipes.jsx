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
          image: null, 
          fileName:null,
          previewImage:"",
          
        });



        const handleAddRecipe = async () => {
          if (!newRecipe.name || !newRecipe.description || !newRecipe.image) {
            alert("Please fill out all fields and upload an image.");
            return;
          }
        
          const formData = new FormData();
          formData.append("rec_name", newRecipe.name);
          formData.append("rec_exp", newRecipe.description);
          formData.append("rec_image", newRecipe.image); 
        
          try {
            const response = await axios.post("http://localhost:5173/api/auth/recepies-create", 
              formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        
            if (response.status === 201) {
              alert("Recipe added successfully!");
              setNewRecipe({ name: "", description: "", image: null, fileName: null });
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddRecipe();
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Recipe Name
              </label>
              <input
                type="text"
                value={newRecipe.name}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                value={newRecipe.description}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Recipe Image</label>
              <div
                className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {newRecipe.image ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={newRecipe.image}
                      alt="Recipe Preview"
                      className="h-32 w-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-gray-600 text-sm">{newRecipe.fileName}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12"
                      />
                    </svg>
                    <p className="text-gray-500 font-medium">Upload a photo</p>
                    <p className="text-gray-400 text-sm">Drag and drop files here</p>
                  </div>
                )}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                      setNewRecipe({
                          ...newRecipe,
                          image: file,  // Keep the File object for API submission
                          fileName: file.name,
                          previewImage: URL.createObjectURL(file) // Separate state for preview
                      });
                  }
              }}
              
                className="hidden"
            />

            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div> 
  </div>  )
 }
 
 export default recepies