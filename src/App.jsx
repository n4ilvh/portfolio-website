import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dither from "./Dither";
import "./App.css";
import About from "./About";

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
              <li className="nav-item"><Link to="/about">Projects</Link></li>
              <li className="nav-item"><Link to="/about">Services</Link></li>
              <li className="nav-item"><Link to="/about">Contact</Link></li>
            </div>
          </nav>

            <div className="test">

            
          <div className="header">
            <h1>Nailah Abel</h1>
            <p>2nd Year Computer Science Student</p>
            <div></div>
          </div>

          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
