
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar';
import LoginPage from './pages/login';
import Home from './pages/home';

function App() {
  return (

     
      <Router>
      
        <div>
          
          <Routes>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/" element={<Home />} /> 
          </Routes>
        </div>
      </Router>
    
  )
}


export default App