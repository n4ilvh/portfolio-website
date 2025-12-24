import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dither from "./Dither";
import "./App.css";
import About from "./About";
import Projects from "./Projects";
// import Services from "./Services";

function App() {
  return (
    <Router>
      {/* Navigation and routes live *inside* Router directly */}
      <div className="app">
        {/* Background */}
        <div className="background">
          <Dither
            waveColor={[0.8, 0.722, 0.616]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={9}
            waveAmplitude={0.5}
            waveFrequency={1.5}
            waveSpeed={0.09}
          />
        </div>

        {/* Foreground / Content */}
        <div className="content">
          <nav>
            <div className="nav-item-container">
              <div className="nav-item"><Link to="/">Home</Link></div>
              <div className="nav-item"><Link to="/about">About</Link></div>
              <div className="nav-item"><Link to="/projects">Projects</Link></div>
              {/* <div className="nav-item"><Link to="/services">Services</Link></div> */}
            </div>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div className="page-container">
                  <div className="header">
                    <div>Nailah Abel</div>
                    <p>Computer Science Student</p>
                  </div>
                  <div className="contact-container">
                      <div className="contact-links">
                          <a href="https://github.com/n4ilvh" target="_blank" rel="noopener noreferrer">github</a>
                          <a href="https://www.linkedin.com/in/nailah-abel/" target="_blank" rel="noopener noreferrer">linkedin</a>
                          <a href="mailto:nailah.abel@gmail.com" target="_blank" rel="noopener noreferrer">email</a>
                          <a href="./resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
                          <a href="https://monkeytype.com/profile/ju6lyy" target="_blank" rel="noopener noreferrer">monkeytype</a>
                      </div>
                  </div>  
                </div>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>
      </div> 
    </Router>
  );
}

export default App;
