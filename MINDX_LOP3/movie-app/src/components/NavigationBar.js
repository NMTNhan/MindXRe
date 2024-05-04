import React from 'react';
import '../styles/styles.css'; // Import styles for Navbar

const NavigationBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Hamburger menu icon */}
        <div className="hamburger-menu">&#9776;</div>
      </div>
      <div className="navbar-center">
        {/* Logo */}
        <img src="../../public/cube.png" alt="" className="logo" />
      </div>
      <div className="navbar-right">
        {/* Search input */}
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </div>
  );
};

export default NavigationBar;
