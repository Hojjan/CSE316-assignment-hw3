import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './navbar'; // Navbar 컴포넌트 임포트
import Home from './homepage';
import FacilityList from "./facilityList";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Home />} />
        
      </Routes>

    </Router>
  );
}



export default App;
