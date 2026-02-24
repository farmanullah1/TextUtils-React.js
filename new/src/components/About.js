import React from "react";

export default function About({ mode }) {
  const myStyle = {
    backgroundColor: mode === "dark" ? "#042743" : "white",
    color: mode === "dark" ? "white" : "#042743",
  };

  return (
    <div className="container my-5" style={myStyle}>
      <h1>About Us</h1>

      <div className="accordion" id="accordionExample">

        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              style={myStyle}
            >
              Analyze Text
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
              TextUtils helps you analyze and manipulate text easily.
            </div>
          </div>
        </div>

        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              style={myStyle}
            >
              Free & Fast
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse">
            <div className="accordion-body">
              Completely free and runs instantly in your browser.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
