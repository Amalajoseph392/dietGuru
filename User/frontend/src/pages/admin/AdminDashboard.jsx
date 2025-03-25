import React, { useState,useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([
    { name: "Spaghetti Bolognese", description: "A classic Italian pasta dish with a rich, meaty sauce." },
    { name: "Chicken Tikka Masala", description: "A flavorful curry with marinated chicken in a creamy tomato sauce." },
    { name: "Vegetable Stir Fry", description: "A quick and healthy dish with fresh veggies and soy sauce." },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    image: null, 
    fileName: null, 
  });


  // ................... function to fetch all the users from db ..............................

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users"); 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle Recipe Addition
  // const handleAddRecipe = () => {
  //   setRecipes([...recipes, newRecipe]);
  //   setShowModal(false);
  //   setNewRecipe({ name: "", description: "" });
  // };

  
const handleAddRecipe = async () => {
  if (!newRecipe.name || !newRecipe.description || !newRecipe.image) {
    alert("Please fill out all fields and upload an image.");
    return;
  }

  alert("inside the receipe add function");
  return

  // Create a FormData object for the file upload
  const formData = new FormData();
  formData.append("name", newRecipe.name);
  formData.append("description", newRecipe.description);
  formData.append("image", document.getElementById("fileInput").files[0]);

  try {
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    const response = await axios.post("YOUR_API_ENDPOINT", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Recipe added successfully:", response.data);
      alert("Recipe added successfully!");


      // Clear the form and close the modal
      setNewRecipe({
        name: "",
        description: "",
        image: null,
        fileName: null,
      });
      setShowModal(false);
    } else {
      console.error("Failed to add recipe:", response.statusText);
      alert("Failed to add recipe. Please try again.");
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
    alert("An error occurred. Please try again.");
  }
};



  // Function to delete a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white flex flex-col">
        <div className="text-xl font-bold p-4 border-b border-gray-600">
          DietMasestro Admin Panel
        </div>
        <button
          className={`p-4 text-left ${
            activeTab === "Dashboard" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`p-4 text-left ${
            activeTab === "Users" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("Users")}
        >
          Users
        </button>
        <button
          className={`p-4 text-left ${activeTab === "Recipes" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("Recipes")}
        >
          Recipes
        </button>
      </div>

      {/* Content Area */}
      <div className="w-4/5 bg-gray-100 p-6">
        {activeTab === "Dashboard" && (
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to the Dashboard!</p>
          </div>
        )}
        {activeTab === "Users" && (
          <div>
            <h1 className="text-2xl font-bold mb-5">Users</h1>

            {/* ................................................Table.......................................................... */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 px-4 py-2">No</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "Recipes" && (
          <div>
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
                              image: URL.createObjectURL(file),
                              fileName: file.name,
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
