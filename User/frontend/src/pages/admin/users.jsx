import React, { useState,useEffect } from "react";
import axios from "axios";
import Navbar from './navbar';
import { modalClasses } from "@mui/material";

function users() {
    const [users, setUsers] = useState([]);
    const [client, setClient]= useState([]);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [selectedDietian, setSelectedDietian]=useState(null);
    const [isEditModalOpen, setEditmodal]=useState(false);
    const [isDeleteModalOpen,setDeleteModal]=useState(false);
    const [isAddModalOpen, setAddModal]=useState(false);
    const [newDietitian, setNewDietitian] = useState({ name: '', email: '', password:'',role: '' });


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("api/auth/users"); 
            const dietians=response.data.filter(data=>data.role=="user")
            const clients=response.data
            setUsers(dietians);
            setClient(clients);
            console.log('clients', client)
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, []);

      //add Dietion

      const addDietitian = async () => {
        try {
          const payload = {
            ...newDietitian,
            role: 'user', 
          };
      
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
      
          if (!response.ok) {
            throw new Error('Failed to add dietitian');
          }
      
          const data = await response.json();
          alert('Added successfully');

      
          closeAddModal();
          
        } catch (error) {
          console.error('Add error:', error);
        }
      };

      //close add modal

      const closeAddModal=()=>{
        setAddModal(false);
        setNewDietitian({ name: '', email: '', role: '',password:'' })
      }
      
      //delete user icon click
      const handleDelete = (user) => {
        setDeleteModal(true);
        setSelectedDietian(user)

      };
      //delete modalclose

      const closeDeleteModal=()=>
      {
        setDeleteModal(false);
        setSelectedDietian(null);
      }

      //api delete
      const deleteDietian = async () => {
        try {
          const response = await fetch(`/api/auth/delete_users/${selectedDietian.email}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete dietitian');
          }
      
          const data = await response.json();
          console.log('Delete successful:', data);
          alert("Deleted Successfully");
      
          closeDeleteModal?.();
          fetchUsers();
        } catch (error) {
          console.error('Delete error:', error);
        }
      };


      //edit icon click
      const handleEdit=(user)=>{
        setEditmodal(true);
        setSelectedDietian(user);

      }
      //edit close modal

      const closeEditModal=()=>{
        setEditmodal(false);
        setSelectedDietian(null);


      }
      
      

      //deit dietian api

      const editDietian = async () => {
        try {
          const response = await fetch(`api/auth/edit_user/${selectedDietian.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: selectedDietian.name,
              role: selectedDietian.role,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update dietitian');
          }
      
          const data = await response.json();
          alert('Updated successfully');
          closeEditModal(); 
          fetchUsers();
      
          
          
        } catch (error) {
          console.error('Edit error:', error);
        }
      };
     
     //function-view dietian icon click

      const viewDietian=(user)=>{
       setIsModalOpen(true);
       setSelectedDietian(user);

      }

      //close view dietion
      const closeModal=()=>{
        setIsModalOpen(false);
        setSelectedDietian(null);
      }

      //assign users to dietian-icon click
      const assignUsers=(user)=>{
        setAssignUserModal(true);
        setSelectedDietian(user);

      }

     
     
    
    
   return (
   



<div className="flex h-screen gap-8">
<Navbar/>
<div className="flex-1 p-6 overflow-auto">
      <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-5">Users</h1>
            <button
              onClick={() => setAddModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Add User
            </button>
      </div>
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
                      <td className="border border-gray-300 px-4 py-2 text-left p-4">
                        <div className="flex items-center gap-x-4">
                          <button className=" cursor-pointer" onClick={()=>viewDietian(user)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </button>
                          <button className="cursor-pointer" onClick={()=>handleEdit(user)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button className="cursor-pointer" onClick={()=>handleDelete(user)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*view modal*/}
            {isModalOpen && selectedDietian && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                 <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                   <h2 className="text-xl font-semibold mb-4">User Details</h2>
                   <p><strong>Name:</strong> {selectedDietian.name}</p>
                   <p><strong>Email:</strong> {selectedDietian.email}</p>
                   <p><strong>Role:</strong> {selectedDietian.role}</p>
                   <button
                     onClick={closeModal}
                     className="bg-gray-300 px-4 py-2 mt-4 rounded-md hover:bg-gray-400"
                     >
                     Close
                   </button>
                 </div>
               </div>
            )}

            {/*add users*/}

            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-semibold mb-4">Add User</h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addDietitian(); // Call the add function
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700">Name:</label>
                      <input
                        type="text"
                        value={newDietitian.name}
                        onChange={(e) =>
                          setNewDietitian({ ...newDietitian, name: e.target.value })
                        }
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700">Email:</label>
                      <input
                        type="email"
                        value={newDietitian.email}
                        onChange={(e) =>
                          setNewDietitian({ ...newDietitian, email: e.target.value })
                        }
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-700">Password:</label>
                      <input
                        type="password"
                        value={newDietitian.password}
                        onChange={(e) =>
                          setNewDietitian({ ...newDietitian, password: e.target.value })
                        }
                        className="w-full border rounded px-3 py-2"
                        required
                      />
                    </div>


                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={closeAddModal}
                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

           {/*edit users*/}


          {isEditModalOpen && selectedDietian && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editDietian(); 
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                      type="text"
                      value={selectedDietian.name}
                      onChange={(e) =>
                        setSelectedDietian({ ...selectedDietian, name: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                      type="email"
                      value={selectedDietian.email}
                      onChange={(e) =>
                        setSelectedDietian({ ...selectedDietian, email: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2"
                      required readOnly
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Role:</label>
                    <input
                      type="text"
                      value={selectedDietian.role}
                      onChange={(e) =>
                        setSelectedDietian({ ...selectedDietian, role: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


          {/*delete users*/}

          {isDeleteModalOpen && selectedDietian &&(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Do you really want to delete {selectedDietian.name} ?</h2>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeDeleteModal}
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteDietian}
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
          

)
}

export default users