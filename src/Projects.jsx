import { useState, useEffect, useRef } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";

const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    desc: "A personal website built to showcase my projects and experiments. Designed with a minimal, responsive layout and custom interactions, and deployed with a custom domain.",
    links: {
      github: "https://github.com/n4ilvh/portfolio-website",
    },
    images: [
      "/screenshots/portfolio/1.png",
      "/screenshots/portfolio/2.png",
    ],
  },
  {
    id: 2,
    title: "unfollowed.exe",
    desc: "A Google Chrome extension that compares your Instagram followers and following lists to reveal which users don’t follow you back, all directly in the browser.",
    links: {
      github: "https://github.com/n4ilvh/unfollowed.exe",
      chrome: "https://chromewebstore.google.com/detail/unfollowedexe/kdkgfkbcjjfohpedofakfeldkoejinpp",
    },
    images: [
      "../screenshots/unfollowed/1.png",
      "../screenshots/unfollowed/2.png",

    ],
  },
  {
    id: 3,
    title: "Phasmophobia Simulator",
    desc: "A multithreaded C simulation inspired by Phasmophobia, where hunters and a ghost move and act independently. Built to explore concurrency, shared memory, synchronization, and low-level systems programming concepts.",
    links: {
      github: "https://github.com/n4ilvh/phasmophobia-simulator",
    },
    images: [
      "../screenshots/phas/1.png",
      "../screenshots/phas/2.png",
    ],
  },
  {
    id: 4,
    title: "Opp Detector",
    desc: "A hackathon project that helps users identify potential threats by analyzing real-time data and user input, presented through a simple and accessible interface.",
    links: {
      devpost: "https://devpost.com/software/opp-detector",
    },
    images: [
      "../screenshots/opp/1.jpg",
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [lastProject, setLastProject] = useState(null);
  const [panelEntered, setPanelEntered] = useState(false);
  const prevActiveRef = useRef(null);


  const toggle = (id) => {
    if (active === id) {
      // start exit animation
      setIsClosing(true);

      setTimeout(() => {
        setActive(null);
        setIsClosing(false);
      }, 300); // match CSS duration
    } 
    
    else if (active !== null) {
      setIsClosing(true); // Trigger the current panel's exit animation

      setTimeout(() => {
        setIsClosing(false);
        setActive(id);        // Mount the new project data
        setCurrentImage(0);   // Reset carousel index
      }, 300); // Wait exactly long enough for the exit animation to finish
    }
    
    else {
      setIsClosing(false);
      setActive(id);
      setCurrentImage(0);
    }
  };

  useEffect(() => {
    if (active !== null) {
      setLastProject(projects.find(p => p.id === active));
    }
  }, [active]);

  useEffect(() => {
    if (active === null && !isClosing) {
      setPanelEntered(false);
      prevActiveRef.current = null;
      return;
    }
    if (isClosing) return;

    const openingFromClosed = prevActiveRef.current === null;
    prevActiveRef.current = active;

    if (openingFromClosed) {
      setPanelEntered(false);
      let cancelled = false;
      const rid1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setPanelEntered(true);
        });
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(rid1);
      };
    }

    setPanelEntered(true);
  }, [active, isClosing]);

  const activeProject = projects.find(p => p.id === active);
  const displayProject = activeProject || lastProject;

  const nextImage = () => {
  const total = displayProject.images?.length || 0;
  setCurrentImage((prev) => (prev + 1) % total);
};

const prevImage = () => {
  const total = displayProject.images?.length || 0;
  setCurrentImage((prev) => (prev - 1 + total) % total);
};
  

  return (
    <div className="projects">
      
      <div className="projects-container">
        <div className="projects-title">Projects</div>
        <section className="projects-layout">
        {/* LEFT LIST */}
        <div class="pixel-window">
          <div class="pixel-window-header">
              <span>project_list.exe</span>
              <div class="window-controls">
                <VscChromeMinimize />
                <VscChromeRestore /> 
                <VscChromeClose />
              </div>
          </div>
          <div className="pixel-window-content">
            <div className="projects-list">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className={`project-row ${active === p.id ? "active" : ""}`}
                  onClick={() => toggle(p.id)}
                >
                  <span className="project-title">{p.title}</span>
                </div>
              ))}
            </div>
          </div>
          
      </div>
       

  {/* RIGHT PANEL */}
        {(displayProject && (active !== null || isClosing)) && (
          <aside
            className={`project-panel ${isClosing ? "exit" : panelEntered ? "open" : ""}`}
          >
            <div className="project-panel-text">
              <h2>{displayProject.title}</h2>
              <p>{displayProject.desc}</p>

              <div className="project-links">
                {displayProject.links.chrome && (
                  <a href={displayProject.links.chrome} target="_blank">
                    Chrome Web Store
                  </a>
                )}
                
                {displayProject.links.github && (
                  <a
                    href={displayProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {displayProject.links.devpost && (
                  <a
                    href={displayProject.links.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Devpost
                  </a>
                )}
              </div>
            </div>
            
            <div className="project-images">
              {displayProject.images && (
                <>
                  <button onClick={prevImage} className="nav-btn left">←</button>

                  <img
                    src={displayProject.images[currentImage]}
                    className="main-image"
                  />

                  <button onClick={nextImage} className="nav-btn right">→</button>
                </>
              )}
            </div>
          </aside>
        )}
      </section>
      </div>
    </div>
  );
}
