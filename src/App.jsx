import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { SiMonkeytype, SiGithub} from "react-icons/si";
import { MdEmail } from "react-icons/md";



import Dither from "./Dither";
import "./App.css";
import About from "./About";
import Projects from "./Projects";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

function App() {
  return (
    <Router>
      {/* Navigation and routes live *inside* Router directly */}
      <div className="app">
        {/* NAVIGATION BAR */}
        {/* <nav>
          <div className="nav-item-container">
            <div className="nav-item"><a href="#home">HOME</a></div>
            <div className="nav-item"><a href="#projects">PROJECTS</a></div>
            <div className="nav-item"><a href="#experience">EXPERIENCE</a></div>
            <div className="nav-item"><a href="#skills">SKILLS</a></div>
            <div className="nav-item"><a href="#contact">CONTACT</a></div>
            
          </div>
        </nav> */}
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
          <div className="background-blocks"></div>
          <div className="content">
                <div className="header">
                  <div>Nailah Abel</div>
                  <p>Computer Science Student</p>
                </div>
                <div className="contact-container">
                  <div className="action-links">
                      <a href="/NailahAbelResume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
                      <a href="#projects" onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("projects");
                      }}>view projects</a>  
                  </div>
                </div> 
                <div className="socials">
                  <a href="https://github.com/n4ilvh" target="_blank" rel="noopener noreferrer"><SiGithub /></a>
                  <a href="https://www.linkedin.com/in/nailah-abel/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                  <a href="mailto:nailah.abel@gmail.com" target="_blank" rel="noopener noreferrer"><MdEmail /></a>
                  {/* <a href="https://monkeytype.com/profile/n4ilvh" target="_blank" rel="noopener noreferrer"><SiMonkeytype /></a> */}
                </div>
                
            </div>
        </section>

        
        {/* PROJECTS PAGE */}
        
            <Projects/>
      </div> 
    </Router>
  );
}

export default App;
