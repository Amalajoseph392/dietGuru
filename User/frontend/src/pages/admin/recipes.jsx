 import React, { useState,useEffect } from "react";
 import axios from "axios";
 import Navbar from './navbar';
 
 function recepies() {
      const [showModal, setShowModal] = useState(false);
      const [selectedRecipe, setSelectedRecipe] = useState(null);
      const [modalOpen, setModalOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const rowsPerPage = 10;
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const [imageFile, setImageFile] = useState(null);

      
      const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    

     const [recipes, setRecipes] = useState([]);
       const [newRecipe, setNewRecipe] = useState({
        name: "",
        description: "",
        cookingTime: "",
        type: "",
        ingredients: "",
        instructions: "",
        image: null,
        fileName: null,
        previewImage: ""
          
        });

        // ....................... fetching all the recipes from the table ..............................
        useEffect(() => {
          const fetchRecipes = async () => {
              try {
                  const response = await axios.get("http://localhost:5000/api/auth/recipes"); 
                  setRecipes(response.data);
              } catch (error) {
                  console.error("Error fetching recipes:", error);
              }
          };
  
          fetchRecipes();
      }, []);




        const handleAddRecipe = async () => {
          if (!newRecipe.name || !newRecipe.description || !newRecipe.cookingTime || !newRecipe.type || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.image) {
            alert("Please fill out all fields and upload an image.");
            return;
          }
        
          const formData = new FormData();
          formData.append("rec_name", newRecipe.name);
          formData.append("rec_exp", newRecipe.description);
          formData.append("rec_cooking_time", newRecipe.cookingTime);
          formData.append("rec_type", newRecipe.type);
          
          // Ensure ingredients is stored as an array (splitting by commas or any delimiter you choose)
          const ingredientsArray = newRecipe.ingredients.split(",").map((item) => item.trim());
          formData.append("rec_ingredients", JSON.stringify(ingredientsArray)); // Send as a JSON string

          formData.append("rec_instructions", newRecipe.instructions);
          formData.append("rec_image", newRecipe.image);
        
          try {
            const response = await axios.post("http://localhost:5000/api/auth/recepies-create", 
              formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        
            if (response.status === 201) {
              alert("Recipe added successfully!");
              setNewRecipe({ name: "", description: "", cookingTime: "",type: "", ingredients: "", instructions: "", image: null, fileName: null, previewImage: "" });
              setShowModal(false);
            }
          } catch (error) {
            console.error("Error adding recipe:", error);
            alert("An error occurred. Please try again.");
          }
        };


        // Open the modal for editing
    const handleEdit = (recipe) => {
      setSelectedRecipe({ ...recipe }); // Clone the selected recipe
      setModalOpen(true);
    };

    const currentRows = recipes.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(recipes.length / rowsPerPage);
    


  // Handle input changes in the modal
  const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedRecipe((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async (recipeId) => {
    try {
      const formData = new FormData();
      formData.append("rec_name", selectedRecipe.rec_name);
      formData.append("rec_exp", selectedRecipe.rec_exp);
      formData.append("rec_cooking_time", selectedRecipe.rec_cooking_time);
      formData.append("rec_type", selectedRecipe.rec_type);
      formData.append("rec_instructions", selectedRecipe.rec_instructions);
      formData.append("rec_ingredients", JSON.stringify(selectedRecipe.rec_ingredients));
  
      if (imageFile) {
        formData.append("rec_image", imageFile); // only if new image selected
      }
  
      await axios.put(`http://localhost:5000/api/auth/recipes/${recipeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Update the recipe list locally
      setRecipes((prev) =>
        prev.map((r) => (r._id === selectedRecipe._id ? selectedRecipe : r))
      );
  
      alert("Updation successful");
      setModalOpen(false);
    } catch (error) {
      alert("Error in updation");
      console.error("Error updating recipe:", error);
    }
  };
  
  

  // Delete a recipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/recipes/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
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
    {/* <div className="grid grid-cols-3 gap-4 p-4">
        {recipes.map((recipe) => (
            <div key={recipe._id} 
            className="bg-white rounded-lg shadow-md p-4 border border-gray-300 cursor-pointer"
            onClick={() => handleEdit(recipe)}>
                {recipe.rec_image && (
                    <img
                        src={`http://localhost:5000${recipe.rec_image}`} // Ensure correct path
                        alt={recipe.rec_name}
                        className="w-full h-64 object-cover rounded-md mb-3"
                    />
                )}
                <h2 className="text-xl font-bold">{recipe.rec_name}</h2>
                <p className="text-gray-600">{recipe.rec_exp}</p>
                
                {recipe.rec_cooking_time && (
                    <p className="text-gray-500"><strong>Cooking Time:</strong> {recipe.rec_cooking_time} mins</p>
                )}

                {recipe.rec_ingredients && recipe.rec_ingredients.length > 0 && (
                    <div className="mt-2">
                        <h3 className="text-md font-semibold">Ingredients:</h3>
                        <ul className="list-disc pl-5 text-gray-500">
                            {recipe.rec_ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button 
                        className="mt-3 px-3 py-1 bg-red-500 text-white rounded" 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent opening modal when deleting
                            handleDelete(recipe._id);
                        }}
                    >
                        Delete
                </button>
            </div>

        ))}
    </div> */}

  <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-purple-200">
            <th className="px-4 py-2">S. No</th>
            <th className="px-4 py-2">Recipe Name</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((recipe, index) => (
            <tr key={recipe._id} className="text-center">
              <td className="px-4 py-2">{indexOfFirstRow + index + 1}</td>
              <td className="px-4 py-2">{recipe.rec_name}</td>
              <td className="px-4 py-2">
                {recipe.rec_image && (
                  <img
                    src={recipe.rec_image || 'http://localhost:5000/uploads/default-image.jpg'}
                    alt={recipe.rec_name}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
                  />
                )}
              </td>
              <td className="px-4 py-2">{recipe.rec_type}</td>
              <td className="px-4 py-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleEdit(recipe)}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(recipe._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-purple-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>





    {/*...................................................................... Modal Add new Receipe........................................................... */}

    {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleAddRecipe(); }}>
                <input type="text" placeholder="Recipe Name" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
                <textarea placeholder="Description" value={newRecipe.description} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2"></textarea>
                <input type="number" placeholder="Cooking Time (mins)" value={newRecipe.cookingTime} onChange={(e) => setNewRecipe({ ...newRecipe, cookingTime: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
                <input type="text" placeholder="Type of the meal" value={newRecipe.type} onChange={(e) => setNewRecipe({ ...newRecipe, type: e.target.value })} required className="w-full px-4 py-2 border rounded mb-2" />
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




        {/* ......................................................... Modal for editing the receipes ...................................................................... */}
        {modalOpen && selectedRecipe && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(selectedRecipe._id); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Recipe Name</label>
                  <input
                    type="text"
                    name="rec_name"
                    value={selectedRecipe.rec_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                    name="rec_exp"
                    value={selectedRecipe.rec_exp}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Cooking Time (mins)</label>
                  <input
                    type="number"
                    name="rec_cooking_time"
                    value={selectedRecipe.rec_cooking_time || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Type of the Meal</label>
                  <input
                    type="text"
                    name="rec_type"
                    value={selectedRecipe.rec_type}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 font-medium">Ingredients (comma separated)</label>
                  <input
                    type="text"
                    name="rec_ingredients"
                    value={selectedRecipe.rec_ingredients}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 font-medium">Instructions</label>
                  <textarea
                    name="rec_instructions"
                    value={selectedRecipe.rec_instructions}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-1 font-medium">Upload Image</label>
                  <div className="mb-2">
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => document.getElementById("editFileInput").click()}
                    >
                      Browse File
                    </button>
                    <input
                      id="editFileInput"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImageFile(file);
                          setSelectedRecipe({
                            ...selectedRecipe,
                            rec_image: file,
                            fileName: file.name,
                            previewImage: URL.createObjectURL(file),
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </div>

                  {selectedRecipe.previewImage && (
                    <img
                      src={selectedRecipe.previewImage}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>

          </div>
        </div>
        )}

    </div> 
  </div>  
  )
 }
 
 export default recepies