import React, { useState } from 'react';
import '../styles/Navbar.css';  // Use relative path to the styles folder
import logo from '../images/logo.png';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`navbar ${isActive ? 'active' : ''}`}>
      <img src={logo} alt="Logo" />
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/news">Current News</a>
        <a href="/contact">Contact Us</a>
      </div>
    </div>
  );
};

export default Navbar;
