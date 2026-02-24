import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ title, mode, toggleMode }) {
  const location = useLocation();
  const isDark = mode === "dark";
  
  // Dynamic color classes based on active theme
  const linkTextClass = isDark ? "text-light" : "text-dark";
  const activeColor = isDark ? "#a855f7" : "#4f46e5";

  return (
    <nav className={`navbar navbar-expand-lg py-3 shadow-lg glass-nav ${isDark ? 'navbar-dark' : 'navbar-light'}`}>
      <div className="container">
        
        {/* Restored ✦ Logo */}
        <Link className="navbar-brand fw-bold fs-3 d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: '2rem', background: 'linear-gradient(90deg,#6366f1,#a855f7)', WebkitBackgroundClip: 'text', color: 'transparent', transform: 'translateY(-2px)' }}>
            ✦
          </span>
          <span className={linkTextClass} style={{ letterSpacing: '-0.5px' }}>{title}</span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto fw-semibold">
            <li className="nav-item">
              <Link className={`nav-link px-4 ${linkTextClass}`} style={{ color: location.pathname === '/' ? activeColor : '', opacity: location.pathname === '/' ? 1 : 0.8 }} to="/">Workspace</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link px-4 ${linkTextClass}`} style={{ color: location.pathname === '/about' ? activeColor : '', opacity: location.pathname === '/about' ? 1 : 0.8 }} to="/about">About App</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
            {/* GitHub Profile Link */}
            <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" 
               className={`btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-bold ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`} 
               style={{borderColor: isDark ? 'rgba(129, 140, 248, 0.5)' : 'rgba(99, 102, 241, 0.5)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              @farmanullah1
            </a>
            
            {/* Theme Switcher */}
            <div className="form-check form-switch d-flex align-items-center mb-0">
              <input className="form-check-input shadow-none mt-0 me-2" type="checkbox" onChange={toggleMode} checked={isDark} id="themeSwitch" style={{ cursor: 'pointer', transform: 'scale(1.2)' }} />
              <label className="form-check-label fw-bold" htmlFor="themeSwitch" style={{ cursor: 'pointer', color: isDark ? '#f8fafc' : '#0f172a' }}>
                {isDark ? '🌙 Cyber' : '☀️ Clean'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}