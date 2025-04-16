import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Blog App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">All Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">Create Blog</Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                <Link className="btn btn-outline-success" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
