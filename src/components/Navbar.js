import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Menu } from 'lucide-react';

//Navbar component to display the navigation bar with links
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);// State to toggle mobile menu
  const location = useLocation();// Hook to get the current location

  // Function to check if the link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark bg-gradient shadow">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <Home size={24} className="text-primary" />
          <span className="fw-bold">Property Finder</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Menu size={24} />
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link d-flex align-items-center gap-2 ${isActive('/')}`}
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/favorites" 
                className={`nav-link d-flex align-items-center gap-2 ${isActive('/favorites')}`}
                onClick={() => setIsOpen(false)}
              >
                <Heart size={20} />
                <span>Favorites</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;