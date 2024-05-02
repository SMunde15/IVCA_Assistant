import React from "react";
import "./App.css";
import SpeechToText from "./SpeechToText";

function App() {
  return (
    <div className="App">
      <div className="layout">
        <aside className="sidebar">
          <h2>Basic Commands</h2>
          <ul className="commands-list">
            <li>
              <strong> RECORD</strong> to start recording
            </li>
            <li>
              <strong>STOP</strong> to stop recording
            </li>
            <li>
              <strong>SEND</strong> to get the respone from API
            </li>
            <li>
              <strong>DISABLE VOICE</strong> if you dont want to listen whole
              respone
            </li>
            {/* <li>I want to search on Google "anything you want"</li>
            <li>I want to Search on YouTube "anything you want"</li>
            <li>I want to search song on Spotify "any song you want"</li>
            <li>Can you give me code for "any program you want"</li>
            <li>Using IVCA "anything you want"</li> */}
            <li>
              <em>For example...</em>
              <ul>
                <li>
                  <em>
                    "using <strong>IVCA</strong> give me the recipe for
                    kothimbir wadi"
                  </em>
                </li>
                <li>
                  <em>
                    "generate <strong>CODE</strong> for binary search tree"
                  </em>
                </li>
                <li>
                  <em>
                    "i want to watch on <strong>YOUTUBE</strong> trending memes"
                  </em>
                </li>
                <li>
                  <em>
                    "i want to search on <strong>GOOGLE</strong> today's news"
                  </em>
                </li>
                <li>
                  <em>
                    "i want to search a song on <strong>SPOTIFY</strong> channa
                    mereya"
                  </em>
                </li>
                <li>
                  <em>
                    "i want to search on <strong>WIKIPEDIA</strong> virat kohli"
                  </em>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
        <main className="main">
          <h1>IVCA : Integrated Voice and Chat Assistant</h1>
          <SpeechToText />
        </main>
      </div>
    </div>
  );
}

export default App;
