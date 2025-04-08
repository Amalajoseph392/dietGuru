 import React, { useState,useEffect } from "react";
 import axios from "axios";
 import Navbar from './navbar';
 import Topbar from "./topbar";

 
 function recepies() {
      const [showModal, setShowModal] = useState(false);
      const [selectedRecipe, setSelectedRecipe] = useState(null);
      const [modalOpen, setModalOpen] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const rowsPerPage = 10;
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const [imageFile, setImageFile] = useState(null);
      const [searchQuery, setSearchQuery] = useState("");


   
     
      
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
                  const response = await axios.get("/api/auth/recipes"); 
                  setRecipes(response.data);
              } catch (error) {
                  console.error("Error fetching recipes:", error);
              }
          };
  
          fetchRecipes();
      }, []);


      const filteredRecipes = recipes.filter((recipe) =>
        recipe.rec_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      

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
            const response = await axios.post("/api/auth/recepies-create", 
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
  
      await axios.put(`/api/auth/recipes/${recipeId}`, formData, {
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
      await axios.delete(`/api/auth/recipes/${id}`);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  };
  const handleDownloadCSV = () => {
    const csvData = filteredRecipes.map(({ rec_name, rec_type, rec_cooking_time }) => ({
      Name: rec_name,
      Type: rec_type,
      "Cooking Time (mins)": rec_cooking_time
    }));
  
    const headers = Object.keys(csvData[0]).join(",");
    const rows = csvData.map(row => Object.values(row).join(",")).join("\n");
    const csvContent = [headers, rows].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recipes.csv";
    link.click();
  };
  
        
        
   return (
  
    <div className="flex h-screen gap-8">
    <Navbar/>
    <div className="flex-1 ">
      <Topbar/>
    <div className="flex-1 p-6 overflow-auto">

    <h1 className="text-2xl font-bold mb-5">Recipes</h1>

    <div className="flex justify-between items-center">
      <div className="relative flex mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search recepies"
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
       
       <button
  className="ml-4 px-4 py-2 bg-blue-500 flex items-center gap-2 rounded-md hover:bg-blue-500"

onClick={handleDownloadCSV}>
<i class="bi bi-filetype-csv"></i>

</button>


<button
  className="ml-2 px-4 py-2 bg-red-400 flex items-center gap-2 rounded-md hover:bg-red-600 text-white"
>
<i class="bi bi-file-earmark-pdf"></i>
  
</button>


</div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-600"
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
  <table id="user-table" className="table-auto w-full text-md border border-gray-200 rounded-4xl">

        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-3 text-gray-700">S. No</th>
            <th className="px-4 py-3 text-gray-700">Recipe Name</th>
            <th className="px-4 py-3 text-gray-700">Image</th>
            <th className="px-4 py-3 text-gray-700">Type</th>
            <th className="px-4 py-3 text-gray-700">Action</th>
           
          </tr>
        </thead>
        <tbody>
          {currentRows.map((recipe, index) => (
            <tr key={recipe._id}         className="odd:bg-white even:bg-gray-200 hover:bg-gray-200 transition-colors"
>
              <td className="px-4 py-2">{indexOfFirstRow + index + 1}</td>
              <td className="px-4 py-2">{recipe.rec_name}</td>
              <td className="px-4 py-2">
                {recipe.rec_image && (
                  <img
                    src={`http://localhost:5173${recipe.rec_image}`}
                    alt={recipe.rec_name}
                    className="w-8 h-8 object-cover rounded-md mx-auto"
                  />
                )}
              </td>
              <td className="px-4 py-2">{recipe.rec_type}</td>
              <td className="px-4 py-2">
              <div className="flex items-center gap-x-4">

                <button
                  
                  onClick={() => handleEdit(recipe)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-600 hover:text-gray-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
                </button>
              
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(recipe._id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500 hover:text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {/* <div className="flex justify-center mt-4 space-x-2">
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
      </div> */}
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