import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ title, mode, toggleMode }) {
  const location = useLocation();
  const isDark = mode === "dark";

  return (
    <nav className={`navbar navbar-expand-lg py-3 shadow-sm ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-white'}`} style={{ backgroundColor: isDark ? '#1e293b' : '#ffffff', borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <span className="me-2" style={{ color: '#6366f1' }}>✨</span> {title}
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
            <li className="nav-item">
              <Link className="nav-link px-3" style={{ color: location.pathname === '/' ? '#6366f1' : '' }} to="/">Workspace</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" style={{ color: location.pathname === '/about' ? '#6366f1' : '' }} to="/about">About App</Link>
            </li>
          </ul>

          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input me-2 shadow-none"
              type="checkbox"
              onChange={toggleMode}
              checked={isDark}
              id="themeSwitch"
              style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
            />
            <label className="form-check-label user-select-none fw-medium" htmlFor="themeSwitch" style={{ cursor: 'pointer', color: isDark ? '#f8fafc' : '#0f172a' }}>
              {isDark ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}