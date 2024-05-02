import React from "react";
import "./App.css";
import SpeechToText from "./SpeechToText";

function App() {
  return (
    <div className="App">
      <div className="layout">
        <aside className="sidebar">
          <h2>Basic Commands</h2>
          <ul>
            <li>Start Recording</li>
            <li>Stop Recording</li>
            <li>Send Text</li>
            <li>I want to Google "anything you want"</li>
            <li>I want to Search on youtube "anything you want"</li>
            <li>I want to search song on spotify "anysong you want"</li>
            <li>can you give me code of "any program you want"</li>
            <li>Using IVCA "anything you want"</li>
          </ul>
        </aside>
        <main className="main">
          <h1 style={{justifySelf:'center'}}>IVCA : Integrated Voice and Chat Assistant</h1>
          <SpeechToText />
        </main>
      </div>
    </div>
  );
}

export default App;
