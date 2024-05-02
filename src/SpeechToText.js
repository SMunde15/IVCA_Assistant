import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./styles.css"; 


const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);

  const toggleSpeech = () => {
    if (isSpeechEnabled) {
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };

const speak = (text) => {
  if (!window.speechSynthesis) {
    alert("Text-to-speech not supported in this browser.");
    return;
  }

  // Function to remove URLs from the text
  const removeUrls = (text) => {
    return text.replace(/https?:\/\/\S+\b/g, "");
  };

  const filteredText = removeUrls(text);

  const utterance = new SpeechSynthesisUtterance(filteredText);
  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

const createMailToLink = (emailBody) => {
  const subject = encodeURIComponent("Your Subject Here"); // You can customize or make it dynamic
  const body = encodeURIComponent(emailBody);
  return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${subject}&body=${body}`;
};


 const setupSpeechRecognition = () => {
   const SpeechRecognition =
     window.SpeechRecognition || window.webkitSpeechRecognition;
   const recognition = new SpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults = true;
   recognition.lang = "en-US";

   let finalTranscript = "";

   recognition.onresult = (event) => {
     let interimTranscript = "";

     for (let i = event.resultIndex; i < event.results.length; ++i) {
       const transcript = event.results[i][0].transcript;
       if (event.results[i].isFinal) {
         finalTranscript += transcript;
       } else {
         interimTranscript += transcript;
       }
     }

     setText(finalTranscript + interimTranscript);

     if (finalTranscript.toLowerCase().includes("send")) {
       sendToAPI(finalTranscript.replace(/send/gi, "").trim());
       finalTranscript = "";
     } else if (
       finalTranscript.toLowerCase().includes("start recording") &&
       !isRecording
     ) {
       handleRecord();
       finalTranscript = "";
     } else if (
       finalTranscript.toLowerCase().includes("please stop") &&
       isRecording
     ) {
       handleRecord();
       finalTranscript = "";
     } else if (finalTranscript.toLowerCase().includes("clear")) {
       setText("");
       finalTranscript = "";
     }
   };

  recognition.onend = () => {
    if (isRecording) {
      recognition.start(); 
    } else {
      setIsRecording(false); 
    }
  };

   return recognition;
 };

 


useEffect(() => {
  const recognition = setupSpeechRecognition();

  if (isRecording) {
    recognition.start();
  }

  return () => {
    recognition.stop();
    recognition.onend = null; // Clean up the onend to prevent multiple triggers
  };
}, [isRecording]);                          

const handleRecord = () => {
  setIsRecording((prevState) => !prevState);
};

const handleSend = () => sendToAPI(text);

  const findUrl = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    return urls ? urls[0] : null;
  };

  const sendToAPI = async (spokenText) => {
    if (!spokenText.trim()) return;

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        "http://192.168.1.36:5000/process_command",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: spokenText }),
        }
      );
      const data = await response.json();
      const newResponse = data.response;
      setResponses((prev) => [...prev, newResponse]);
      speak(newResponse);

      // Check if response contains "mail"
      if (newResponse.toLowerCase().includes("mail")) {
        const mailUrl = createMailToLink(newResponse);
        window.open(mailUrl, "_blank"); // Open Gmail in a new tab
      } else {
        // Check for URLs in the response and open in a new tab if found
        const url = findUrl(newResponse);
        if (url) {
          window.open(url, "_blank").focus(); // Open in a new tab and focus on it
        }
      }
    } catch (error) {
      console.error("Error sending data to API:", error);
      speak("Error communicating with the API.");
    } finally {
      setIsLoading(false);
    }
  };


  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  return (
      <div className="container">
        {isLoading && (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className="responses">
          {responses.map((response, index) => (
            <div key={index} className="response-container">
              <h3>API Response:</h3>
              <Markdown
                children={response}
                components={components}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          ))}
        </div>
        <div className="input-area">
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Speak something..."
          />
          <button
            className="button"
            onClick={handleRecord}
            style={{ marginRight: "0.3vw" }}
          >
            {isRecording ? "Stop" : "Record"}
          </button>
          <button
            className="button"
            onClick={handleSend}
            style={{ marginRight: "0.3vw" }}
          >
            Send
          </button>
          <button className="button" onClick={toggleSpeech}>
            {isSpeechEnabled ? "Disable Voice " : "Enable Voice "}
          </button>
        </div>
      </div>

  );
};

export default SpeechToText;
