
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import TransporterDashboard from './components/TransporterDashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? (user.userType === 'manufacturer' ? <ManufacturerDashboard /> : <TransporterDashboard />) : <Login setUser={setUser} />}
        />
        <Route path="/register" element={<Registration />} />
        <Route path="/manufacturer" element={user ? <ManufacturerDashboard /> : <Login setUser={setUser} />} />
        <Route path="/transporter" element={user ? <TransporterDashboard /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
