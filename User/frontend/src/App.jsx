import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import Home from './pages/home';
import About from './pages/about';
import SignIn from './pages/signIn';
import RecipePage from './pages/RecipePage';
import Diet from './pages/diet';
import KnowAbout from './pages/knowAbout';
import Result from './pages/result';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/users';
import AdminRecipes from './pages/admin/recipes';
import AdminDietian from './pages/admin/dietian';
import Profile from './pages/profile';
import Status from './pages/status';
import Client from './pages/dietition/clients';
import View_client from './pages/dietition/view_client'

import { AuthProvider } from '../src/context/AuthContext';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (

<AuthProvider>     
      <Router>
      
        <div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
          
          <Routes>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/recipies" element={<RecipePage />} /> 
            <Route path="/signIn" element={<SignIn />} /> 
            <Route path="/diet" element={<Diet />} /> 
            <Route path="/know" element={<KnowAbout />} /> 
            <Route path="/result" element={<Result />} /> 
            <Route path="/AdminDashboard" element={<AdminDashboard />} /> 
            <Route path="/AdminUsers" element={<AdminUsers />} /> 
            <Route path="/AdminRecipes" element={<AdminRecipes />} /> 
            <Route path="/AdminDietian" element={<AdminDietian />} /> 
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/status_log" element={<Status/>}/>
            <Route path="/client" element={<Client/>}/>
            <Route path="/view-client/:email" element={<View_client />} />            






          </Routes>
        </div>
      </Router>
      </AuthProvider>
  )
}


export default App