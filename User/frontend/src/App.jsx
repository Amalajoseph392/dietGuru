
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/navbar'
import LoginPage from './pages/login';
import SignIn from './pages/signIn';

function App() {
  return (
    <div>
      <Router>
        <div>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<LoginPage />} /> 
            <Route path="/signIn" element={<SignIn />} /> 
            {/* <Route path="/home" element={<HomePage />} />  */}
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App