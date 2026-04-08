import React, { useState, useRef, useEffect } from "react";
import "../css/Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timerRef = useRef(null);

  // Start timer on hover
  const handleMouseEnter = () => {
    setDropdownOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    // Start 5-second auto-close timer
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 5000);
  };

  // Clear timer if mouse leaves
  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(false);
  };

  // Reset timer if user hovers over dropdown links
  const handleDropdownLinkClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src="images/logo.jpg" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/collections">Collections</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        <div className="nav-right">
          {/* Profile link */}
          <a href="/profile" className="profile-link">Profile</a>

          {/* Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="dropdown-title">Account ▾</span>
            {dropdownOpen && (
              <div className="dropdown-content">
                <a href="/signin" onClick={handleDropdownLinkClick}>Sign In</a>
                <a href="/signup" onClick={handleDropdownLinkClick}>Sign Up</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <img src="images/download (2).jpg" alt="Hero" className="hero-img" />
        <div className="hero-text">
          <h1>Stylish Furniture for Your Home</h1>
          <p>Modern designs that bring comfort and style.</p>
          <a href="/getproducts" className="hero-btn">Shop Now</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;