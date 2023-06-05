import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://webdashboardbackend.onrender.com/auth/registers', { username, password, userType });
      setRegistrationSuccess(true);
    } catch (error) {
      alert('username is allready use', error);
    }
  };

  if (registrationSuccess) {
    return (
      <div>
        <h2>Registration successful!</h2>
        <Link to="/">here</Link> to continue.
      </div>
    );
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select User Type</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="transporter">Transporter</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;