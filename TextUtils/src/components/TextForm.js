import React, { useState, useEffect } from "react";

export default function TextForm({ showAlert, mode }) {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleChange = (e) => setText(e.target.value);

  const transformText = (action) => {
    if (!text && action !== "clear" && action !== "lorem") return showAlert("Please enter some text first!", "warning");

    let newText = text;
    let extracted;

    try {
      switch (action) {
        // --- 1. CORE CASING ---
        case "upper": newText = text.toUpperCase(); break;
        case "lower": newText = text.toLowerCase(); break;
        case "title": newText = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); break;
        case "sentence": newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
        case "alternating": newText = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''); break;
        case "inverse": newText = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
        case "randomcase": newText = text.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join(''); break;
        case "spongebob": newText = text.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join(''); break; 
        case "proper": newText = text.replace(/\b\w/g, c => c.toUpperCase()); break;
        
        // --- 2. DEVELOPER FORMATTING ---
        case "camel": newText = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, ''); break;
        case "pascal": newText = text.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, ''); break;
        case "snake": newText = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text; break;
        case "kebab": newText = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || text; break;
        case "train": newText = text.replace(/\s+/g, '-').toUpperCase(); break;
        case "macro": newText = text.replace(/\s+/g, '_').toUpperCase(); break;
        case "dot": newText = text.replace(/\s+/g, '.'); break;
        case "path": newText = text.replace(/\s+/g, '/'); break;
        case "jsonStringify": newText = JSON.stringify({ data: text.split('\n') }, null, 2); break;
        case "trimlines": newText = text.split('\n').map(l => l.trim()).join('\n'); break;

        // --- 3. DEEP CLEANING ---
        case "spaces": newText = text.replace(/\s+/g, " ").trim(); break;
        case "lines": newText = text.replace(/\n{2,}/g, '\n').trim(); break;
        case "html": newText = text.replace(/<[^>]*>?/gm, ''); break;
        case "punctuation": newText = text.replace(/[.,/#!$%^&*;:{}=\-_`~()'"?<>]/g, ""); break;
        case "alphanumeric": newText = text.replace(/[^a-zA-Z0-9 \n]/g, ""); break;
        case "removenumbers": newText = text.replace(/[0-9]/g, ""); break;
        case "removeletters": newText = text.replace(/[a-zA-Z]/g, ""); break;
        case "removeemojis": newText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, ''); break;
        case "removevowels": newText = text.replace(/[aeiouAEIOU]/g, ''); break;
        case "removeconsonants": newText = text.replace(/(?![aeiouAEIOU])[a-zA-Z]/g, ''); break;
        case "accents": newText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); break;
        
        // *ESLINT FIX: Removed unnecessary backslash before [*
        case "brackets": newText = text.replace(/[[\](){}⟨⟩<>\\]/g, ''); break;
        
        case "nowhitespace": newText = text.replace(/\s/g, ''); break;
        case "trimstart": newText = text.trimStart(); break;
        case "trimend": newText = text.trimEnd(); break;
        case "removeurls": newText = text.replace(/https?:\/\/[^\s]+/g, ""); break;
        case "removeemails": newText = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, ""); break;

        // --- 4. LISTS & STRUCTURE ---
        case "duplicates": newText = [...new Set(text.split('\n'))].join('\n'); break;
        case "dupwords": newText = [...new Set(text.split(' '))].join(' '); break;
        case "sortAZ": newText = text.split('\n').sort((a, b) => a.localeCompare(b)).join('\n'); break;
        case "sortZA": newText = text.split('\n').sort((a, b) => b.localeCompare(a)).join('\n'); break;
        case "sortlengthAsc": newText = text.split('\n').sort((a, b) => a.length - b.length).join('\n'); break;
        case "sortlengthDesc": newText = text.split('\n').sort((a, b) => b.length - a.length).join('\n'); break;
        case "shuffle": newText = text.split('\n').sort(() => Math.random() - 0.5).join('\n'); break;
        case "shufflewords": newText = text.split(' ').sort(() => Math.random() - 0.5).join(' '); break;
        case "bullet": newText = text.split('\n').filter(l => l.trim() !== '').map(l => `• ${l}`).join('\n'); break;
        case "dashlist": newText = text.split('\n').filter(l => l.trim() !== '').map(l => `- ${l}`).join('\n'); break;
        case "linenumbers": newText = text.split('\n').map((l, i) => `${i + 1}. ${l}`).join('\n'); break;
        case "bracketnumbers": newText = text.split('\n').map((l, i) => `${i + 1}) ${l}`).join('\n'); break;
        case "alphabetlist": newText = text.split('\n').map((l, i) => `${String.fromCharCode(65 + (i % 26))}. ${l}`).join('\n'); break;
        case "csv": newText = text.split(/\s+/).join(','); break;
        case "tsv": newText = text.split(/\s+/).join('\t'); break;
        case "quotes": newText = text.split('\n').map(l => `"${l}"`).join('\n'); break;
        case "singlequotes": newText = text.split('\n').map(l => `'${l}'`).join('\n'); break;
        case "reverse": newText = text.split("").reverse().join(""); break;
        case "reverselines": newText = text.split('\n').reverse().join('\n'); break;
        case "reversewords": newText = text.split(' ').map(w => w.split('').reverse().join('')).join(' '); break;
        case "wordwrap": newText = text.replace(/(?![^\n]{1,80}$)([^\n]{1,80})\s/g, '$1\n'); break;

        // --- 5. TEXT MANIPULATION & FUN ---
        case "clap": newText = text.split(' ').join(' 👏 '); break;
        case "wide": newText = text.split('').join(' '); break;
        case "repeat2": newText = text + "\n" + text; break;
        case "repeat5": newText = Array(5).fill(text).join('\n'); break;
        case "lorem": newText = text + (text ? "\n\n" : "") + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; break;
        case "timestamp": newText = text + `\n\n[Appended: ${new Date().toLocaleString()}]`; break;
        case "strikethrough": newText = text.split('').map(c => c + '\u0336').join(''); break;
        case "underline": newText = text.split('').map(c => c + '\u0332').join(''); break;

        // --- 6. ADVANCED EXTRACTION BOT ---
        case "emails": extracted = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi); break;
        case "urls": extracted = text.match(/https?:\/\/[^\s]+/g); break;
        case "numbers": extracted = text.match(/\d+/g); break;
        case "dates": extracted = text.match(/\b\d{1,4}[-/]\d{1,2}[-/]\d{1,4}\b/g); break;
        
        // *ESLINT FIX: Removed unnecessary backslashes in phone regex*
        case "phones": extracted = text.match(/[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}/g); break;
        
        case "hexcolors": extracted = text.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g); break;
        case "hashtags": extracted = text.match(/#[a-z0-9_]+/gi); break;
        case "mentions": extracted = text.match(/@[a-z0-9_]+/gi); break;
        case "ips": extracted = text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g); break;
        case "mac": extracted = text.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/g); break;
        case "emojis": extracted = text.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu); break;
        case "questions": extracted = text.match(/[^.!?]+\?/g); break;
        case "extractvowels": extracted = text.match(/[aeiouAEIOU]/g); break;
        case "extractconsonants": extracted = text.match(/(?![aeiouAEIOU])[a-zA-Z]/g); break;
        case "extractupper": extracted = text.match(/\b[A-Z]+\b/g); break;
        case "extractlower": extracted = text.match(/\b[a-z]+\b/g); break;

        // --- 7. CIPHERS & ENCODING ---
        case "b64encode": newText = btoa(unescape(encodeURIComponent(text))); break;
        case "b64decode": newText = decodeURIComponent(escape(atob(text))); break;
        case "urlencode": newText = encodeURIComponent(text); break;
        case "urldecode": newText = decodeURIComponent(text); break;
        
        // *ESLINT FIX: Removed unnecessary backslash in htmlencode regex*
        case "htmlencode": newText = text.replace(/[\u00A0-\u9999<>&]/g, i => '&#'+i.charCodeAt(0)+';'); break;
        
        case "htmldecode": newText = text.replace(/&#([0-9]{1,3});/gi, (match, num) => String.fromCharCode(parseInt(num))); break;
        case "binary": newText = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '); break;
        case "binaryToText": newText = text.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''); break;
        case "hex": newText = text.split('').map(c => c.charCodeAt(0).toString(16)).join(' '); break;
        case "hexToText": newText = text.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join(''); break;
        case "octal": newText = text.split('').map(c => c.charCodeAt(0).toString(8)).join(' '); break;
        case "octalToText": newText = text.split(' ').map(o => String.fromCharCode(parseInt(o, 8))).join(''); break;
        case "rot13": newText = text.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)); break;
        case "caesarPlus1": newText = text.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 1) ? c : c - 26)); break;
        case "caesarMinus1": newText = text.replace(/[a-zA-Z]/g, c => String.fromCharCode((c >= "a" ? 97 : 65) <= (c = c.charCodeAt(0) - 1) ? c : c + 26)); break;
        case "atbash": newText = text.replace(/[a-z]/gi, c => String.fromCharCode(c.charCodeAt(0) <= 90 ? 155 - c.charCodeAt(0) : 219 - c.charCodeAt(0))); break;
        case "morseEncode": 
          const m={'a':'.-','b':'-...','c':'-.-.','d':'-..','e':'.','f':'..-.','g':'--.','h':'....','i':'..','j':'.---','k':'-.-','l':'.-..','m':'--','n':'-.','o':'---','p':'.--.','q':'--.-','r':'.-.','s':'...','t':'-','u':'..-','v':'...-','w':'.--','x':'-..-','y':'-.--','z':'--..','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.','0':'-----',' ':'/'};
          newText = text.toLowerCase().split('').map(c => m[c] || c).join(' '); break;
        case "morseDecode":
          const revM = {'.-':'a','-...':'b','-.-.':'c','-..':'d','.':'e','..-.':'f','--.':'g','....':'h','..':'i','.---':'j','-.-':'k','.-..':'l','--':'m','-.':'n','---':'o','.--.':'p','--.-':'q','.-.':'r','...':'s','-':'t','..-':'u','...-':'v','.--':'w','-..-':'x','-.--':'y','--..':'z','.----':'1','..---':'2','...--':'3','....-':'4','.....':'5','-....':'6','--...':'7','---..':'8','----.':'9','-----':'0','/':' '};
          newText = text.split(' ').map(c => revM[c] || c).join(''); break;
        case "leet": newText = text.toLowerCase().replace(/[aeiost]/g, m => ({'a':'4','e':'3','i':'1','o':'0','s':'5','t':'7'}[m])); break;
        case "slugify": newText = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''); break;

        case "clear": newText = ""; break;
        default: break;
      }

      // Handle Extractor Responses
      if (["emails", "urls", "numbers", "dates", "phones", "hexcolors", "hashtags", "mentions", "ips", "mac", "emojis", "questions", "extractvowels", "extractconsonants", "extractupper", "extractlower"].includes(action)) {
        if (extracted && extracted.length > 0) { 
          newText = extracted.join('\n'); 
          showAlert(`Successfully extracted ${extracted.length} items!`, "success"); 
        } else {
          return showAlert("No matches found in the text!", "warning");
        }
      } else if (action !== "clear") {
        showAlert(`Successfully applied formatting!`, "success");
      } else {
        showAlert("Workspace cleared!", "success");
      }

      setText(newText);
    } catch (error) {
      showAlert("Operation failed. Invalid format for this tool.", "danger");
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

  // --- DEEP ANALYTICS ---
  const wordCount = text.match(/\b\w+\b/g)?.length || 0;
  const charCount = text.length;
  const charNoSpace = text.replace(/\s/g, '').length;
  const sentenceCount = text.split(/[.!?]+/).filter(e => e.trim().length !== 0).length;
  const paragraphCount = text.split(/\n+/).filter(e => e.trim().length !== 0).length;
  const lineCount = text ? text.split(/\n/).length : 0;
  const bytes = new Blob([text]).size;
  const readTime = (wordCount / 200).toFixed(1); 
  const speakTime = (wordCount / 130).toFixed(1);
  const wordsArray = text.match(/\b\w+\b/g) || [];
  const longestWord = wordsArray.reduce((a, b) => a.length > b.length ? a : b, "N/A");
  
  return (
    <div className="row g-4 mb-5">
      
      {/* LEFT COLUMN: THE TEXT STUDIO */}
      <div className="col-xl-8 col-lg-7">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold m-0 gradient-text">Master Studio</h2>
          <div>
            <button disabled={!text} className={`btn btn-sm ${isSpeaking ? 'btn-danger' : 'btn-info'} text-white me-2 px-3 py-2 fw-bold`} onClick={speak} style={{borderRadius: '8px'}}>
              {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
            </button>
            <button disabled={!text} className="btn btn-sm btn-danger px-3 py-2 fw-bold" onClick={() => transformText("clear")} style={{borderRadius: '8px'}}>🗑 Clear</button>
          </div>
        </div>

        <div className="card border-0 modern-card mb-4 p-1">
          <div className="card-body p-4">
            <textarea
              className="form-control border-0 custom-textarea mb-4 p-4 shadow-none"
              style={{ resize: "vertical", minHeight: "220px" }}
              value={text}
              onChange={handleChange}
              placeholder="Paste or type your text here. Access exactly 100 deep-tools below..."
            />
            
            {/* MASSIVE TOOLBOX SCROLL CONTAINER */}
            <div className="pe-2" style={{ maxHeight: '550px', overflowY: 'auto', overflowX: 'hidden' }}>
              
              <div className="tool-section-title mt-0">✨ Core Casing</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("upper")}>UPPER</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("lower")}>lower</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("title")}>Title Case</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("sentence")}>Sentence</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("proper")}>Proper</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("alternating")}>aLtErNaTe</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("inverse")}>iNVERSE</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("randomcase")}>rAnDoM</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("spongebob")}>sPoNgEbOb</button>
              </div>

              <div className="tool-section-title">💻 Developer Formatting</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("camel")}>camelCase</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("pascal")}>PascalCase</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("snake")}>snake_case</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("kebab")}>kebab-case</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("train")}>TRAIN-CASE</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("macro")}>MACRO_CASE</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("dot")}>dot.case</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("path")}>path/case</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("jsonStringify")}>Format JSON</button>
                <button disabled={!text} className="btn btn-secondary btn-nano" onClick={() => transformText("trimlines")}>Trim Lines</button>
              </div>

              <div className="tool-section-title">🧹 Deep Cleaning</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("spaces")}>Fix Spaces</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("lines")}>No Empty Lines</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("nowhitespace")}>Strip All Whitespace</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("trimstart")}>Trim Start</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("trimend")}>Trim End</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("html")}>Strip HTML</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("accents")}>Remove Accents</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("brackets")}>Remove Brackets</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("punctuation")}>No Punctuation</button>
                <button disabled={!text} className="btn btn-warning text-dark btn-nano" onClick={() => transformText("alphanumeric")}>Alphanumeric Only</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removenumbers")}>No Numbers</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removeletters")}>No Letters</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removeemojis")}>No Emojis</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removevowels")}>No Vowels</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removeconsonants")}>No Consonants</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removeurls")}>Remove URLs</button>
                <button disabled={!text} className="btn btn-danger btn-nano text-white" onClick={() => transformText("removeemails")}>Remove Emails</button>
              </div>

              <div className="tool-section-title">📝 Structure & Lists</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("duplicates")}>No Duplicate Lines</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("dupwords")}>No Duplicate Words</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("sortAZ")}>Sort A-Z</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("sortZA")}>Sort Z-A</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("sortlengthAsc")}>Sort length (Asc)</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("sortlengthDesc")}>Sort length (Desc)</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("shuffle")}>Shuffle Lines</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("shufflewords")}>Shuffle Words</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("bullet")}>Bullets</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("dashlist")}>Dash List</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("linenumbers")}>1. List</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("bracketnumbers")}>1) List</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("alphabetlist")}>A. List</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("csv")}>To CSV</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("tsv")}>To TSV</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("quotes")}>"Quotes"</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("singlequotes")}>'Quotes'</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("reverse")}>Reverse All</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("reverselines")}>Reverse Lines</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("reversewords")}>Reverse Words</button>
                <button disabled={!text} className="btn btn-info text-dark fw-bold btn-nano" onClick={() => transformText("wordwrap")}>Wrap 80 Chars</button>
              </div>

              <div className="tool-section-title">🔍 Advanced AI Extraction Bot</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("emails")}>@ Emails</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("urls")}>🔗 URLs</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("numbers")}>🔢 Numbers</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("dates")}>📅 Dates</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("phones")}>📞 Phones</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("hexcolors")}>🎨 Hex Colors</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("hashtags")}># Hashtags</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("mentions")}>@ Mentions</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("ips")}>🌐 IPs</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("mac")}>🖥️ MAC</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("emojis")}>😀 Emojis</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("questions")}>❓ Questions</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("extractvowels")}>Vowels</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("extractconsonants")}>Consonants</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("extractupper")}>CAPS Words</button>
                <button disabled={!text} className="btn btn-primary btn-nano" onClick={() => transformText("extractlower")}>lower words</button>
              </div>

              <div className="tool-section-title">🔐 Cryptography & Web Encoders</div>
              <div className="tool-grid">
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("b64encode")}>B64 Encode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("b64decode")}>B64 Decode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("urlencode")}>URL Encode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("urldecode")}>URL Decode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("htmlencode")}>HTML Encode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("htmldecode")}>HTML Decode</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("binary")}>To Binary</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("binaryToText")}>Binary {">"} Text</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("hex")}>To Hex</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("hexToText")}>Hex {">"} Text</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("octal")}>To Octal</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("octalToText")}>Octal {">"} Text</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("rot13")}>ROT13</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("caesarPlus1")}>Caesar +1</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("caesarMinus1")}>Caesar -1</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("atbash")}>Atbash Cipher</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("morseEncode")}>Morse Code</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("morseDecode")}>Decode Morse</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("leet")}>L33T 5P34K</button>
                <button disabled={!text} className="btn btn-outline-light btn-nano text-dark bg-white" onClick={() => transformText("slugify")}>Slugify</button>
              </div>

              <div className="tool-section-title">✨ Fun & Generators</div>
              <div className="tool-grid pb-3">
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("clap")}>👏 Clap Text</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("wide")}>W i d e</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("strikethrough")}>S̶t̶r̶i̶k̶e̶</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("underline")}>U̲n̲d̲e̲r̲l̲i̲n̲e̲</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("repeat2")}>Repeat x2</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("repeat5")}>Repeat x5</button>
                <button disabled={!text} className="btn btn-success btn-nano" onClick={() => transformText("timestamp")}>Timestamp</button>
                <button className="btn btn-success btn-nano" onClick={() => transformText("lorem")}>+ Lorem Ipsum</button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: DEEP ANALYTICS */}
      <div className="col-xl-4 col-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold m-0 gradient-text">Analytics</h2>
          <button disabled={!text} className="btn btn-sm btn-success px-4 fw-bold shadow-sm" onClick={handleCopy} style={{borderRadius: '8px'}}>📋 Copy Output</button>
        </div>

        <div className="card shadow-lg border-0 modern-card p-1 sticky-top" style={{top: '100px'}}>
          <div className="card-body">
            
            <div className="row g-2 mb-4">
              <div className="col-6"><div className="stat-box"><div className="stat-value text-info">{wordCount}</div><small className="text-muted fw-bold">WORDS</small></div></div>
              <div className="col-6"><div className="stat-box"><div className="stat-value text-primary">{charCount}</div><small className="text-muted fw-bold">CHARS</small></div></div>
              <div className="col-6"><div className="stat-box"><div className="stat-value text-success" style={{fontSize: '1.5rem'}}>{sentenceCount}</div><small className="text-muted fw-bold">SENTENCES</small></div></div>
              <div className="col-6"><div className="stat-box"><div className="stat-value text-warning" style={{fontSize: '1.5rem'}}>{paragraphCount}</div><small className="text-muted fw-bold">PARAGRAPHS</small></div></div>
            </div>

            <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', color: '#818cf8' }}>Deep Insights</h6>
            <ul className="list-group list-group-flush mb-0" style={{ background: 'transparent' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom border-secondary" style={{ color: 'inherit' }}>
                <span>Total Lines</span><span className="badge bg-primary rounded-pill">{lineCount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom border-secondary" style={{ color: 'inherit' }}>
                <span>Chars (No Spaces)</span><span className="badge bg-secondary rounded-pill">{charNoSpace}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom border-secondary" style={{ color: 'inherit' }}>
                <span>Data Size</span><span className="badge bg-info text-dark rounded-pill">{bytes} Bytes</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom border-secondary" style={{ color: 'inherit' }}>
                <span>Est. Read Time</span><span className="badge bg-success rounded-pill">{readTime} min</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-bottom border-secondary" style={{ color: 'inherit' }}>
                <span>Est. Speak Time</span><span className="badge bg-danger rounded-pill">{speakTime} min</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent border-0" style={{ color: 'inherit' }}>
                <span>Longest Word</span><span className="badge bg-dark border rounded-pill" style={{maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis'}}>{longestWord}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}