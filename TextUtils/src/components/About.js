import React from "react";

export default function About({ mode }) {
  const isDark = mode === "dark";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const textColor = isDark ? "#f8fafc" : "#0f172a";

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">About <span style={{color: '#6366f1'}}>TextUtils</span></h1>
        <p className="lead" style={{ opacity: 0.8 }}>Your all-in-one toolkit for analyzing, formatting, and extracting text directly in your browser.</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 p-4 modern-card" style={{ backgroundColor: cardBg, color: textColor }}>
            <div className="mb-3">
              <span className="display-4 text-primary">⚡</span>
            </div>
            <h4 className="fw-bold">Lightning Fast</h4>
            <p style={{ opacity: 0.8 }}>Everything happens right inside your browser. No server calls, no waiting, and completely offline capable once loaded.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 p-4 modern-card" style={{ backgroundColor: cardBg, color: textColor }}>
            <div className="mb-3">
              <span className="display-4 text-success">🔒</span>
            </div>
            <h4 className="fw-bold">Privacy First</h4>
            <p style={{ opacity: 0.8 }}>We do not store or save your text. Your sensitive documents, emails, and data never leave your personal computer.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 p-4 modern-card" style={{ backgroundColor: cardBg, color: textColor }}>
            <div className="mb-3">
              <span className="display-4 text-warning">🛠️</span>
            </div>
            <h4 className="fw-bold">15+ Powerful Tools</h4>
            <p style={{ opacity: 0.8 }}>Go beyond word counts. Instantly extract emails, strip punctuation, fix spacing, encode to Base64, and calculate reading time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}