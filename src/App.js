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
            <li>
              To know how it works,{" "}
              <a
                href="https://photos.google.com/share/AF1QipOcBTy4spRNIb7k3PKsg9Zvvc-UxN-Xw_BVqek3VorIYKbJ-Ef4XmzrcTjI3e4dxA/photo/AF1QipNURssX07mO6VCl3VrQBwJ2QKE_iNtElL-Hy2MD?key=TWl4cVlfRHRaMV9HLUVKU3FiMHAweTNCa291NXhn"
                target="_blank"
                rel="noopener noreferrer"
              >
                CLICK HERE
              </a>
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
