import React, { useState,useEffect } from "react";
import axios from "axios";
import Navbar from './navbar';

import Topbar from "./topbar";
import jsPDF from "jspdf";
import "jspdf-autotable";


import { modalClasses } from "@mui/material";

function dietian() {
    const [users, setUsers] = useState([]);
    const [client, setClient]= useState([]);
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [selectedDietian, setSelectedDietian]=useState(null);
    const [isEditModalOpen, setEditmodal]=useState(false);
    const [isDeleteModalOpen,setDeleteModal]=useState(false);
    const [isAddModalOpen, setAddModal]=useState(false);
    const [newDietitian, setNewDietitian] = useState({ name: '', email: '', password:'',role: '' });

    const [isAssignUserModal,setAssignUserModal]=useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

        const [searchQuery, setSearchQuery] = useState("");
const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // ✅ Filter users by search + date range
  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;


    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("api/auth/users"); 
            const dietians=response.data.filter(data=>data.role=="dietian")
            const clients=response.data.filter(data=>data.role=="user")
            setUsers(dietians);
            setClient(clients);
            console.log('clients', users)
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
            role: 'dietian', 
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
      const handleAssignUsers = async (user) => {
        setSelectedDietian(user);
        setAssignUserModal(true);
      
        try {
          const res = await fetch(`api/auth/get_assign_user/${user.email}`);
          const data = await res.json();
      
          if (res.ok) {
            setSelectedUsers(data.assigned_users); 
          } else {
            console.error("Error fetching assigned users", data.message);
          }
        } catch (error) {
          console.error("Error fetching assigned users:", error);
        }
      };
      

      //close modal-asign users

      const closeAssignUserModal=()=>{
        setAssignUserModal(false);
        setSelectedDietian(null);
        setSelectedUsers([]);
      }

      //allocate users-dietian -api function

      const assignDietitian = async () => {
        console.log("selectedDietitian",selectedDietian)
        try {
          const payload = {
            dietian_name: selectedDietian.name,
            email: selectedDietian.email,
            assigned_users: selectedUsers, 
          };
      
          const response = await fetch('/api/auth/dietian_users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
      
          if (!response.ok) {
            throw new Error('Failed to assign dietitian');
          }
      
          const data = await response.json();
          console.log('Assignment successful:', data);
          alert("Assigned Successfully");
          closeAssignUserModal();
        } catch (error) {
          console.error('Assignment error:', error);
        }
      };
      

     const downloadCSV = () => {
             const headers = ["Name", "Email"];
             const rows = users
               .filter(user => user.role === 'dietian')
               .map(user => [user.name, user.email]);
           
             const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
           
             const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
             const url = URL.createObjectURL(blob);
           
             const link = document.createElement("a");
             link.setAttribute("href", url);
             link.setAttribute("download", "dietitian.csv");
             link.click();
           };
     
          
     
     const downloadPDF = () => {
       const doc = new jsPDF();
       const table = document.querySelector('#user-table');
     
       // if (!table) {
         console.error('Table not found!',doc);
       //   return;
       // }
     
       // doc.autoTable({
       //   html: table, 
       //   styles: { fontSize: 10 },
       // });
     
       doc.autoTable({
         head: [['Username', 'Email', 'Role']],
         body: users.map(user => [user.username, user.email, user.role]),
       });
     
       doc.save('users.pdf');
     };

     const filteredUsers = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLocaleLowerCase());
        if (!startDate || !endDate) return matchesSearch;
      const userDate = new Date(user.AddedOn);
      const start =  new Date(startDate);
      const end = new Date(endDate);
  
     
      return  matchesSearch && userDate>=start && userDate<=end;
    });
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
    
    const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
   return (
   



<div className="flex h-screen gap-8">
<Navbar/>

<div className="flex-1">
  <Topbar/>
  <div className="flex-1 p-6 overflow-auto">
  <h1 className="text-2xl font-bold mb-5">Dietitians</h1>

      <div className="flex justify-between items-center">
            <div className="relative flex mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by name or email"
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
           <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md mx-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

       
       <button
  onClick={downloadCSV}
  className="ml-4 px-4 py-2 bg-blue-500 flex items-center gap-2 rounded-md hover:bg-blue-500"
>
<i class="bi bi-filetype-csv"></i>

</button>


<button
  onClick={downloadPDF}
  className="ml-2 px-4 py-2 bg-red-400 flex items-center gap-2 rounded-md hover:bg-red-600 text-white"
>
<i class="bi bi-file-earmark-pdf"></i>
  
</button>


</div>
            <button
              onClick={() => setAddModal(true)}
              className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-600"


            >
              + Add Dietitian
            </button>
      </div>
            <div className="overflow-x-auto">

            <table id="user-table" className="table-auto w-full text-md border border-gray-200 rounded-4xl">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="px-4 py-3 text-gray-700">No</th>
      <th className="px-4 py-3 text-gray-700">Name</th>
      <th className="px-4 py-3 text-gray-700">Email</th>
      <th className="px-4 py-3 text-gray-700">Action</th>
      <th className="px-4 py-3 text-gray-700">Created Date</th>
    </tr>
    </thead>
                <tbody>
                {currentRows
  .filter(user =>
    user.role === 'dietian' &&
    (user.name.toLowerCase().includes(searchQuery) || user.email.toLowerCase().includes(searchQuery))
  ).map((user, index) => (
                    <tr key={user.id} className="odd:bg-white even:bg-gray-200 hover:bg-gray-200 transition-colors">
                      <td className=" px-4 py-2 text-center">{index + 1}</td>
                      <td className="  px-4 py-2">{user.name}</td>
                      <td className=" px-4 py-2">{user.email}</td>
                      <td className=" px-4 py-2 text-center ">

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

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-500 hover:text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

                          </button>
                          <button
                            onClick={() => handleAssignUsers(user)}
                            className="bg-green-800 text-white px-2 py-1 rounded hover:bg-green-900"
                          >
                            + Assign Users
                          </button>
                        </div>
                      </td>
                      <td>{user.AddedOn.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            </div>

            <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
            {/*view modal*/}
            {isModalOpen && selectedDietian && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                 <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                   <h2 className="text-xl font-semibold mb-4">Dietitian Details</h2>
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
                  <h2 className="text-xl font-semibold mb-4">Add Dietitian</h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addDietitian(); 
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

                        className="bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-600"

                      >
                        Add Dietitian
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
                <h2 className="text-xl font-semibold mb-4">Edit Dietitian</h2>

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
                      

                      className="bg-yellow-400  px-4 py-2 rounded-md hover:bg-yellow-600"

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

                      className="bg-yellow-400  px-4 py-2 rounded-md hover:bg-yellow-600"

                    >
                      Delete
                  </button>
                </div>
              </div>
            </div>
          )}


          {/*assign users*/}
          {isAssignUserModal && selectedDietian && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                  Assign Users to {selectedDietian.name}
                </h2>

               
                <div className="mb-4 relative">
  <label className="block text-gray-700 mb-2">Assign Users (Max: 10):</label>
  
  <div
    className="border rounded px-3 py-2 cursor-pointer bg-white"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {selectedUsers.length > 0
      ? `${selectedUsers.length} user(s) selected`
      : "Select users"}
  </div>

  {dropdownOpen && (
    <div className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-y-auto mt-1">
      {client.map((c, index) => (
        <label key={index} className="flex items-center px-3 py-2 hover:bg-gray-100">
          <input
            type="checkbox"
            className="mr-2"
            value={c.email}
            checked={selectedUsers.includes(c.email)}
            onChange={(e) => {
              const email = e.target.value;
              if (e.target.checked) {
                if (selectedUsers.length < 10) {
                  setSelectedUsers([...selectedUsers, email]);
                } else {
                  alert("You can assign a maximum of 10 users.");
                }
              } else {
                setSelectedUsers(selectedUsers.filter((u) => u !== email));
              }
            }}
          />
          {c.name}
        </label>
      ))}
    </div>
  )}
                </div>


             
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeAssignUserModal}
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={assignDietitian}
                    type="button"

                    className="bg-yellow-400  px-4 py-2 rounded-md hover:bg-yellow-600"

                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
          

)
}

export default dietian