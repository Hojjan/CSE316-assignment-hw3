import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './navbar'; // Navbar 컴포넌트 임포트
import Home from './homepage';
import FacilityList from "./facilityList";
import Reservation from './reservation';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/facilityList" element={<FacilityList />} />
        <Route path="/reservation" element={<Reservation />} />
        
      </Routes>

    </Router>
  );
}



export default App;
