
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar';
import LoginPage from './pages/login';
import Home from './pages/home';
import RecipePage from './pages/RecipePage';

function App() {
  return (

     
      <Router>
      
        <div>
          
          <Routes>
            <Route path="/" element={<LoginPage />} /> 
            <Route path="/home" element={<Home />} /> 
            <Route path="/RecipePage" element={<RecipePage />} /> 
          </Routes>
        </div>
      </Router>
    
  )
}


export default App