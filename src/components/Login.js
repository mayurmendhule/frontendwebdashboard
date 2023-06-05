
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://webdashboardbackend.onrender.com/auth/login', { username, password });
      setUser(response.data.user);
      alert('Login successful');

      if (response.data.user.userType === 'manufacturer') {
        navigate('/manufacturer');
      } else if (response.data.user.userType === 'transporter') {
        navigate('/transporter');
      }
    } catch (error) {
      alert('User Not Registered');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      <div>
      <Link to="/register">here</Link> to Registration.
      </div>
    </div>
  );
}

export default Login;
