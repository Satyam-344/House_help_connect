import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      alert('Login successful!');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert('Login failed. Check email or password.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
