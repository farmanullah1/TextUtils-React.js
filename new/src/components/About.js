import React, { useState } from 'react'

export default function About() {

  const [myStyle, setMyStyle] = useState({
    color: 'white',
    backgroundColor: 'black',
    btnBackgroundColor: 'white',
    border: '1px solid white'

  })
  const [btnText, setBtnText] = useState("Enable Light Mode")

  const toggleStyle = () => {
    if (myStyle.color === 'white') {
      setMyStyle({
        color: 'black',
        backgroundColor: 'white',
        btnColor: 'black'
      })
      setBtnText("Enable Dark Mode")
    } else {
      setMyStyle({
        color: 'white',
        backgroundColor: 'black',
        btnBackgroundColor: 'white'
      })
      setBtnText("Enable Light Mode")
    }
  }

  return (
    <div className="container" style={myStyle}>
      <h1 className='my-5'>About Us</h1>

      <div className="accordion" id="accordionExample">

        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={myStyle}
            >
              Accordion Item #1
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body" style={myStyle}>
              This is the first accordion body.
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
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse">
            <div className="accordion-body" style={myStyle}>
              This is the second accordion body.
            </div>
          </div>
        </div>

      </div>

      <button
        onClick={toggleStyle}
        type="button"
        className="btn btn-primary my-3"
      >
        {btnText}
      </button>

    </div>
  )
}
