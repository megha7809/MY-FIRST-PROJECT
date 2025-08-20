import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Nav() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: '#8B0000' }}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="rounded-circle bg-white d-flex align-items-center justify-content-center text-danger fw-bold me-2" style={{ width: '48px', height: '48px' }}>
            SC
          </div>
          <span className="fs-4 fw-bold text-white">
            Smart<span className="text-white">Canteen</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon bg-white"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white fw-medium">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link text-white">Menu</Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Link to="/myorder" className="nav-link text-white">
                  My Order
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="nav-link text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please login first to access My Order");
                    navigate('/login');
                  }}
                >
                  My Order
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">Contact</Link>
            </li>
          </ul>

          {/* Auth Button */}
          <div className="d-flex mt-2 mt-lg-0">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-light w-100"
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    logout();
                    navigate("/");
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-light w-100">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;