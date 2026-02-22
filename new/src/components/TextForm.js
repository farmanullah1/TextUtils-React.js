import React, { useState } from 'react'

export default function TextForm(props) {

  const [text, setText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleUpClick = () => {
    setText(text.toUpperCase())
    props.showAlert("Converted to uppercase!", "success")
  }

  const handleLoClick = () => {
    setText(text.toLowerCase())
    props.showAlert("Converted to lowercase!", "success")
  }

  const handleClearClick = () => {
    setText('')
    props.showAlert("Text Cleared!", "success")
  }

  const handleFirstLetterUppercaseClick = () => {
    if (text.length > 0) {
      setText(text.charAt(0).toUpperCase() + text.slice(1))
      props.showAlert("First letter capitalized!", "success")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    props.showAlert("Copied to Clipboard!", "success")
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/\s+/).join(" ")
    setText(newText)
    props.showAlert("Extra spaces removed!", "success")
  }

  const speak = () => {
    if (!isSpeaking) {
      let msg = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(msg)
      setIsSpeaking(true)
    } else {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleOnChange = (event) => {
    setText(event.target.value)
  }

  // Accurate word count
  const wordCount = text.split(/\s+/).filter((word) => word.length !== 0).length

  return (
    <>
      <div className="container"
        style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>

        <h1 className="mb-4">{props.heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743'
            }}
            rows="8"
          ></textarea>
        </div>

        <button disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}>
          Uppercase
        </button>

        <button disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}>
          Lowercase
        </button>

        <button disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleFirstLetterUppercaseClick}>
          First Letter Uppercase
        </button>

        <button disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>

        <button disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}>
          Copy Text
        </button>

        <button disabled={text.length === 0}
          className="btn btn-danger mx-1 my-1"
          onClick={handleClearClick}>
          Clear
        </button>

        <button disabled={text.length === 0}
          onClick={speak}
          className="btn btn-warning mx-1 my-1">
          {isSpeaking ? "Stop" : "Speak"}
        </button>

      </div>

      <div className="container my-3"
        style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>

        <h2>Your text summary</h2>
        <p>{wordCount} words and {text.length} characters</p>
        <p>{(0.008 * wordCount).toFixed(2)} Minutes read</p>

        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  )
}
