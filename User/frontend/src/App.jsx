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

function App() {
  return (

     
      <Router>
      
        <div>
          
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


          </Routes>
        </div>
      </Router>
    
  )
}


export default App