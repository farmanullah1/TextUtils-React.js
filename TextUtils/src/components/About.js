import React from "react";

export default function About({ mode }) {
  const isDark = mode === "dark";
  const textColor = isDark ? "#f8fafc" : "#0f172a";
  const mutedText = isDark ? "rgba(248, 250, 252, 0.7)" : "rgba(15, 23, 42, 0.7)";

  return (
    <div className="container py-5 my-4" style={{ color: textColor }}>
      {/* Hero Section */}
      <div className="text-center mb-5 fade-in">
        <h1 className="fw-bold display-4 mb-3">
          Welcome to <span className="gradient-text">TextUtils Studio</span>
        </h1>
        <p className="lead mx-auto" style={{ maxWidth: '750px', color: mutedText, lineHeight: '1.8' }}>
          The ultimate, developer-grade toolkit designed to manipulate, extract, and format text instantly within your browser. Built with a stunning Glassmorphism UI and optimized for maximum productivity.
        </p>
      </div>

      {/* Glassmorphism Feature Cards */}
      <div className="row g-4 mb-5">
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 p-4 modern-card text-center border-0">
            <div className="mb-4">
              <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.6))' }}>⚡</span>
            </div>
            <h4 className="fw-bold gradient-text mb-3">Lightning Fast</h4>
            <p style={{ color: mutedText, fontSize: '0.95rem' }}>
              Powered by React, every single operation happens instantly on your client-side browser. No API delays, no server wait times, and entirely offline-capable once loaded.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 p-4 modern-card text-center border-0">
            <div className="mb-4">
              <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.6))' }}>🔒</span>
            </div>
            <h4 className="fw-bold gradient-text mb-3">Privacy First</h4>
            <p style={{ color: mutedText, fontSize: '0.95rem' }}>
              We value your data. Your sensitive documents, emails, and code snippets are never stored, saved, or sent to any external server. 100% locally secure.
            </p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mx-auto">
          <div className="card h-100 p-4 modern-card text-center border-0">
            <div className="mb-4">
              <span style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 0 15px rgba(236,72,153,0.6))' }}>🛠️</span>
            </div>
            <h4 className="fw-bold gradient-text mb-3">100+ Powerful Tools</h4>
            <p style={{ color: mutedText, fontSize: '0.95rem' }}>
              Go far beyond simple word counts. Extract IP addresses, format JSON, encrypt with Base64, convert to Developer Casings, and view deep live analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Banner */}
      <div className="mt-5 text-center p-5 modern-card border-0 position-relative overflow-hidden" style={{ borderRadius: '24px' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h3 className="fw-bold mb-3">Built & Designed by <span className="gradient-text">Farmanullah</span></h3>
          <p style={{ color: mutedText, maxWidth: '600px', margin: '0 auto' }} className="mb-4">
            Passionate about crafting premium web applications, MERN stack development, and building seamless user experiences.
          </p>
          <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" 
             className="btn btn-lg fw-bold shadow text-white" 
             style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', borderRadius: '12px', padding: '12px 30px' }}>
            Visit My GitHub 🚀
          </a>
        </div>
      </div>
      
    </div>
  );
}