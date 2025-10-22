import Dither from './Dither';
import './App.css';

function App() {
  return (
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

      {/* Foreground */}
      <div className="content">
        <header>
          <h1>Nailah Abel</h1>
          <p>Computer Science Student</p>
        </header>

        <nav>
          <ul>
            <li><a href="about.html" className="keycap">About</a></li>
            <li><a href="projects.html" className="keycap">Projects</a></li>
            <li><a href="skills.html" className="keycap">Skills</a></li>
            <li><a href="services.html" className="keycap">Services</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
