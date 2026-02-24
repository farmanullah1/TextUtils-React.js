import React, { useState, useEffect } from "react";

export default function TextForm({ showAlert, heading, mode }) {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const transformText = (type) => {
    if (!text.trim()) return;

    let newText = text;

    switch (type) {
      case "upper":
        newText = text.toUpperCase();
        showAlert("Converted to uppercase!", "success");
        break;
      case "lower":
        newText = text.toLowerCase();
        showAlert("Converted to lowercase!", "success");
        break;
      case "clear":
        newText = "";
        showAlert("Text cleared!", "success");
        break;
      case "spaces":
        newText = text.replace(/\s+/g, " ").trim();
        showAlert("Extra spaces removed!", "success");
        break;
      default:
        break;
    }

    setText(newText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showAlert("Copied to clipboard!", "success");
    } catch {
      showAlert("Clipboard not supported!", "danger");
    }
  };

  const speak = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const textColor = mode === "dark" ? "white" : "#042743";
  const bgColor = mode === "dark" ? "#13466e" : "white";

  return (
    <>
      <div className="container" style={{ color: textColor }}>
        <h1>{heading}</h1>

        <textarea
          className="form-control"
          value={text}
          onChange={handleChange}
          rows="8"
          style={{ backgroundColor: bgColor, color: textColor }}
        />

        <div className="my-3">
          <button className="btn btn-primary mx-1 my-1" disabled={!text} onClick={() => transformText("upper")}>Uppercase</button>
          <button className="btn btn-primary mx-1 my-1" disabled={!text} onClick={() => transformText("lower")}>Lowercase</button>
          <button className="btn btn-primary mx-1 my-1" disabled={!text} onClick={() => transformText("spaces")}>Remove Spaces</button>
          <button className="btn btn-success mx-1 my-1" disabled={!text} onClick={handleCopy}>Copy</button>
          <button className="btn btn-danger mx-1 my-1" disabled={!text} onClick={() => transformText("clear")}>Clear</button>
          <button className="btn btn-warning mx-1 my-1" disabled={!text} onClick={speak}>
            {isSpeaking ? "Stop" : "Speak"}
          </button>
        </div>
      </div>

      <div className="container my-3" style={{ color: textColor }}>
        <h2>Summary</h2>
        <p>{wordCount} words | {text.length} characters</p>
        <p>{(0.008 * wordCount).toFixed(2)} minutes read</p>
        <h3>Preview</h3>
        <p>{text || "Nothing to preview!"}</p>
      </div>
    </>
  );
}
