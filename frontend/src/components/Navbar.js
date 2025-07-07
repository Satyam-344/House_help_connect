import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      padding: '10px 20px',
      backgroundColor: '#1e88e5',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>House Help Connect</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginLeft: '15px',
  fontWeight: 'bold'
};

export default Navbar;
