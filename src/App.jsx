import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";

import Dither from "./Dither";
import "./App.css";
import About from "./About";
import Projects from "./Projects";

function App() {
  return (
    <Router>
      {/* Navigation and routes live *inside* Router directly */}
      <div className="app">
        {/* NAVIGATION BAR */}
        <nav>
          <div className="nav-item-container">
            <div className="nav-item"><a href="#home">HOME</a></div>
            <div className="nav-item"><a href="#projects">PROJECTS</a></div>
            <div className="nav-item"><a href="#experience">EXPERIENCE</a></div>
            <div className="nav-item"><a href="#skills">SKILLS</a></div>
            <div className="nav-item"><a href="#contact">CONTACT</a></div>
            
          </div>
        </nav>
        {/* HOME PAGE */}
        <section className="home" id="home">
          <div className="background">
            <Dither
              waveColor={[0.8, 0.722, 0.616]}
              disableAnimation={false}
              enableMouseInteraction={false}
              mouseRadius={0.3}
              colorNum={9}
              waveAmplitude={0.5}
              waveFrequency={1.5}
              waveSpeed={0.09}
            />
          </div>
          
          <div className="content">
            <div className="page-container">
              
                <div className="header">
                  <div>Nailah Abel</div>
                  <p>Computer Science Student</p>
                </div>
                <div className="contact-container">
                  <div className="contact-links">
                      {/* <a href="https://github.com/n4ilvh" target="_blank" rel="noopener noreferrer">github</a>
                      <a href="https://www.linkedin.com/in/nailah-abel/" target="_blank" rel="noopener noreferrer">linkedin</a>
                      <a href="mailto:nailah.abel@gmail.com" target="_blank" rel="noopener noreferrer">email</a>
                      <a href="https://monkeytype.com/profile/n4ilvh" target="_blank" rel="noopener noreferrer">monkeytype</a> */}
                      <a href="https://nailahabel.dev/resume.pdf" target="_blank">resume</a>
                      <a href="#projects">view projects</a>
                      
                  </div>
                </div> 
            <div className="background-blocks">
            <img src="../media/blocks.png"></img> 
          </div>

                <div class="pixel-window">
                  <div class="pixel-window-header">
                      <span>hobbies.exe</span>
                      <div class="window-controls">
                        <VscChromeMinimize />
                        <VscChromeRestore /> 
                        <VscChromeClose />
                      </div>
                  </div>
                  <div>
                    <p></p>coding
                    <p></p>music
                    <p></p>basketball
                    <p></p>video games
                  </div>
                </div>
                
            </div>
          </div>
        </section>

        
        {/* PROJECTS PAGE */}
        <section id="projects">
          <div className="content2">
                        

          </div>
        </section>
      </div> 
    </Router>
  );
}

export default App;
