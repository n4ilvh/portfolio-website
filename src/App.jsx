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
          <header>
            <h1>Nailah Abel</h1>
            <p>Computer Science Student</p>
          </header>

          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/about">Projects</Link></li>
              <li><Link to="/about">Services</Link></li>
              <li><Link to="/about">Contact</Link></li>
            </ul>
          </nav>

          {/* Routes placed here, just like in the test version */}
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
