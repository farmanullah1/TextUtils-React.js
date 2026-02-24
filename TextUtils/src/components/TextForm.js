import React, { useState, useEffect } from "react";

export default function TextForm({ showAlert, mode }) {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const transformText = (action) => {
    if (!text.trim() && action !== "clear") return;

    let newText = text;

    try {
      switch (action) {
        // CASE CONVERSION
        case "upper":
          newText = text.toUpperCase();
          showAlert("Converted to UPPERCASE!", "success");
          break;
        case "lower":
          newText = text.toLowerCase();
          showAlert("Converted to lowercase!", "success");
          break;
        case "title":
          newText = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          showAlert("Converted to Title Case!", "success");
          break;
        case "sentence":
          newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
          showAlert("Converted to Sentence case!", "success");
          break;
        case "alternating":
          newText = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
          showAlert("Converted to aLtErNaTiNg case!", "success");
          break;

        // FORMATTING
        case "spaces":
          newText = text.replace(/\s+/g, " ").trim();
          showAlert("Extra spaces removed!", "success");
          break;
        case "lines":
          newText = text.replace(/\n{2,}/g, '\n').trim();
          showAlert("Empty lines removed!", "success");
          break;
        case "punctuation":
          newText = text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
          showAlert("Punctuation removed!", "success");
          break;
        case "alphanumeric":
          newText = text.replace(/[^a-zA-Z0-9 \n]/g, "");
          showAlert("Special characters removed!", "success");
          break;

        // EXTRACTION
        case "emails":
          const emails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
          if (emails) { newText = emails.join('\n'); showAlert("Emails extracted!", "success"); } 
          else { return showAlert("No emails found!", "warning"); }
          break;
        case "numbers":
          const numbers = text.match(/\d+/g);
          if (numbers) { newText = numbers.join(', '); showAlert("Numbers extracted!", "success"); } 
          else { return showAlert("No numbers found!", "warning"); }
          break;
        case "links":
          const links = text.match(/https?:\/\/[^\s]+/g);
          if (links) { newText = links.join('\n'); showAlert("Links extracted!", "success"); } 
          else { return showAlert("No links found!", "warning"); }
          break;

        // ADVANCED
        case "encode":
          newText = btoa(unescape(encodeURIComponent(text)));
          showAlert("Text encoded to Base64!", "success");
          break;
        case "decode":
          newText = decodeURIComponent(escape(atob(text)));
          showAlert("Base64 decoded to text!", "success");
          break;
        case "reverse":
          newText = text.split("").reverse().join("");
          showAlert("Text reversed!", "success");
          break;
        case "clear":
          newText = "";
          showAlert("Workspace cleared!", "success");
          break;
        default: break;
      }
      setText(newText);
    } catch (error) {
      showAlert("Operation failed. Invalid text format.", "danger");
    }
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); showAlert("Copied to clipboard!", "success"); } 
    catch { showAlert("Clipboard not supported!", "danger"); }
  };

  const speak = () => {
    if (!window.speechSynthesis) return showAlert("Audio not supported.", "danger");
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const msg = new SpeechSynthesisUtterance(text);
      msg.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(msg);
      setIsSpeaking(true);
    }
  };

  useEffect(() => { return () => window.speechSynthesis.cancel(); }, []);

  // Analytics Logic
  const wordCount = text.split(/\s+/).filter((e) => e.length !== 0).length;
  const sentenceCount = text.split(/[.!?]+/).filter((e) => e.trim().length !== 0).length;

  // Theme Colors
  const isDark = mode === "dark";
  const cardBg = isDark ? "#1e293b" : "#ffffff";
  const inputBg = isDark ? "#0f172a" : "#f1f5f9";
  const textColor = isDark ? "#f8fafc" : "#0f172a";

  return (
    <div className="row g-4">
      {/* Left Column: Editor & Tools */}
      <div className="col-lg-8">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold m-0">TextUtils Studio</h2>
          <div>
            <button disabled={!text} className="btn btn-sm btn-success me-2 btn-custom" onClick={handleCopy}>📋 Copy</button>
            <button disabled={!text} className="btn btn-sm btn-danger btn-custom" onClick={() => transformText("clear")}>🗑 Clear</button>
          </div>
        </div>

        <div className="card shadow-sm border-0 modern-card mb-4" style={{ backgroundColor: cardBg, color: textColor }}>
          <div className="card-body p-4">
            <textarea
              className="form-control border-0 custom-textarea mb-4 p-3 shadow-none"
              value={text}
              onChange={handleChange}
              placeholder="Paste or type your text here to begin..."
              rows="8"
              style={{ backgroundColor: inputBg, color: textColor, resize: "none" }}
            />
            
            <div className="row g-4">
              {/* Casing Tools */}
              <div className="col-md-6">
                <div className="tool-section-title">Case Conversion</div>
                <div className="d-flex flex-wrap gap-2">
                  <button disabled={!text} className="btn btn-primary btn-custom" style={{backgroundColor: '#6366f1', border: 'none'}} onClick={() => transformText("upper")}>UPPER</button>
                  <button disabled={!text} className="btn btn-primary btn-custom" style={{backgroundColor: '#6366f1', border: 'none'}} onClick={() => transformText("lower")}>lower</button>
                  <button disabled={!text} className="btn btn-primary btn-custom" style={{backgroundColor: '#6366f1', border: 'none'}} onClick={() => transformText("title")}>Title</button>
                  <button disabled={!text} className="btn btn-primary btn-custom" style={{backgroundColor: '#6366f1', border: 'none'}} onClick={() => transformText("sentence")}>Sentence</button>
                  <button disabled={!text} className="btn btn-primary btn-custom" style={{backgroundColor: '#6366f1', border: 'none'}} onClick={() => transformText("alternating")}>aLtErNaTe</button>
                </div>
              </div>

              {/* Formatting Tools */}
              <div className="col-md-6">
                <div className="tool-section-title">Clean & Format</div>
                <div className="d-flex flex-wrap gap-2">
                  <button disabled={!text} className="btn btn-secondary btn-custom" onClick={() => transformText("spaces")}>Fix Spaces</button>
                  <button disabled={!text} className="btn btn-secondary btn-custom" onClick={() => transformText("lines")}>Remove Lines</button>
                  <button disabled={!text} className="btn btn-secondary btn-custom" onClick={() => transformText("punctuation")}>No Punctuation</button>
                  <button disabled={!text} className="btn btn-secondary btn-custom" onClick={() => transformText("alphanumeric")}>Alphanumeric Only</button>
                </div>
              </div>

              {/* Extraction Tools */}
              <div className="col-md-6">
                <div className="tool-section-title">Extract Data</div>
                <div className="d-flex flex-wrap gap-2">
                  <button disabled={!text} className="btn btn-info text-white btn-custom" onClick={() => transformText("emails")}>@ Emails</button>
                  <button disabled={!text} className="btn btn-info text-white btn-custom" onClick={() => transformText("links")}>🔗 Links</button>
                  <button disabled={!text} className="btn btn-info text-white btn-custom" onClick={() => transformText("numbers")}>🔢 Numbers</button>
                </div>
              </div>

              {/* Advanced Tools */}
              <div className="col-md-6">
                <div className="tool-section-title">Advanced</div>
                <div className="d-flex flex-wrap gap-2">
                  <button disabled={!text} className={`btn ${isSpeaking ? 'btn-danger' : 'btn-dark'} btn-custom`} onClick={speak}>{isSpeaking ? "⏹ Stop" : "🔊 Read"}</button>
                  <button disabled={!text} className="btn btn-outline-secondary btn-custom" onClick={() => transformText("reverse")}>Reverse</button>
                  <button disabled={!text} className="btn btn-outline-primary btn-custom" onClick={() => transformText("encode")}>Base64 Encode</button>
                  <button disabled={!text} className="btn btn-outline-success btn-custom" onClick={() => transformText("decode")}>Base64 Decode</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Analytics */}
      <div className="col-lg-4">
        <h2 className="mb-3 fw-bold">Live Analytics</h2>
        <div className="row g-3 mb-4">
          <div className="col-6">
            <div className="card shadow-sm border-0 text-center p-3 modern-card" style={{ backgroundColor: cardBg }}>
              <h3 className="text-primary fw-bold mb-0" style={{color: '#6366f1 !important'}}>{wordCount}</h3>
              <small style={{ color: textColor }}>Words</small>
            </div>
          </div>
          <div className="col-6">
            <div className="card shadow-sm border-0 text-center p-3 modern-card" style={{ backgroundColor: cardBg }}>
              <h3 className="text-success fw-bold mb-0">{text.length}</h3>
              <small style={{ color: textColor }}>Characters</small>
            </div>
          </div>
          <div className="col-6">
            <div className="card shadow-sm border-0 text-center p-3 modern-card" style={{ backgroundColor: cardBg }}>
              <h3 className="text-info fw-bold mb-0">{sentenceCount}</h3>
              <small style={{ color: textColor }}>Sentences</small>
            </div>
          </div>
          <div className="col-6">
            <div className="card shadow-sm border-0 text-center p-3 modern-card" style={{ backgroundColor: cardBg }}>
              <h3 className="text-warning fw-bold mb-0">{(0.008 * wordCount).toFixed(1)}</h3>
              <small style={{ color: textColor }}>Mins Read Time</small>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 modern-card" style={{ backgroundColor: cardBg }}>
          <div className="card-body">
            <h5 className="fw-bold mb-3" style={{ color: textColor }}>Preview</h5>
            <div 
              className="p-3 rounded-3" 
              style={{ backgroundColor: inputBg, color: textColor, minHeight: '150px', maxHeight: '300px', overflowY: 'auto' }}
            >
              {text.length > 0 ? text : <span style={{opacity: 0.5}}>Your formatted text will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}