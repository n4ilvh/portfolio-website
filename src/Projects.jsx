import { useState, useEffect, useRef } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    date: "10-2025",
    desc: "A personal portfolio built to display my projects, technical skills, and design style. Features an retro desktop inspired interface, responsive layouts, and interactive UI elements.",
    links: {
      github: "https://github.com/n4ilvh/portfolio-website",
    },
    released: true,
    images: [
      "../screenshots/portfolio/1.png",
      "../screenshots/portfolio/2.png",
      "../screenshots/portfolio/3.png",
      "../screenshots/portfolio/4.png",
    ],
  },
  {
    id: 2,
    title: "unfollowed.exe",
    date: "12-2025",
    desc: "A Google Chrome extension that identifies Instagram users who don't follow you back by comparing your followers and following lists directly in the browser. Built with a focus on privacy, usability, and a simple one-click experience.",
    links: {
      github: "https://github.com/n4ilvh/unfollowed.exe",
      chrome: "https://chromewebstore.google.com/detail/unfollowedexe/kdkgfkbcjjfohpedofakfeldkoejinpp",
    },
    released: true,
    images: [
      "../screenshots/unfollowed_exe/1.png",
      "../screenshots/unfollowed_exe/2.png",
    ],
  },
  {
    id: 3,
    title: "Phasmophobia Simulator",
    date: "12-2025",
    desc: "A multithreaded simulation written in C for my COMP 2401 final project, inspired by the video game Phasmophobia. Multiple hunters and a ghost operate concurrently, providing hands-on experience with threads, synchronization, shared memory, and low-level systems programming.",
      links: {
      github: "https://github.com/n4ilvh/phasmophobia-simulator",
    },
    released: true,
    images: [
      "../screenshots/phasmophobia_simulator/1.png",
      "../screenshots/phasmophobia_simulator/2.png",
    ],
  },
  {
    id: 4,
    title: "Opp Detector",
    date: "03-2025",
    desc: "A hackathon project that uses facial recognition to identify individuals who are not on an approved whitelist. I designed and developed the frontend, creating an accessible interface that displays detection results in real time.",
      links: {
        github: "https://github.com/jasonkdeng/OppDetector",
        devpost: "https://devpost.com/software/opp-detector",
      },
    released: true,
    images: [
      "../screenshots/opp_detector/1.jpg",
      "../screenshots/opp_detector/2.png",
      "../screenshots/opp_detector/3.jpg",
    ],
  },
  {
    id: 5,
    title: "NSBE Carleton Website",
    date: "06-2026",
    desc: `Designed and developed a modern, responsive website for the National Society of Black Engineers (NSBE) Carleton chapter. 
    The site provides students with a central hub to discover upcoming events, explore past events, learn about the organization, 
    and stay connected with the chapter.`,
      links: {
    },
    released: false,
    images: [
      "../screenshots/nsbe/1.png",
    ],
  }
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
      setIsClosing(true);

      setTimeout(() => {
        setActive(null);
        setCurrentImage(0);
        setIsClosing(false);
      }, 300);

      return;
    }

    setIsClosing(true);

    setTimeout(() => {
      setActive(id);
      setCurrentImage(0);
      setIsClosing(false);
    }, 300);
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

  useEffect(() => {
  if (!displayProject) return;

  displayProject.images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, [displayProject]);

  const nextImage = () => {
  const total = displayProject.images?.length || 0;
  setCurrentImage((prev) => (prev + 1) % total);
};

const prevImage = () => {
  const total = displayProject.images?.length || 0;
  setCurrentImage((prev) => (prev - 1 + total) % total);
};
  

  return (
    <section className="projects" id="projects">
      <div className="projects">
        <div className="projects-container">
          <div className="projects-title">Projects</div>
          <section className="projects-layout">
            {/* LEFT LIST */}
            <div className="pixel-window">
              <div className="pixel-window-header">
                  <span>project_list.exe</span>
                  <div className="window-controls">
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
          <aside
            className={`
              project-panel
              ${active !== null ? "open" : ""}
              ${isClosing ? "exit" : ""}
              ${displayProject ? "" : "hidden"}
            `}
          >
            <div className="pixel-window2">
              <div className="pixel-window-header">
                  <span>project_details.exe</span>
                  <div className="window-controls">
                    <VscChromeMinimize />
                    <VscChromeRestore /> 
                    <VscChromeClose />
                  </div>
              </div>
            <div className="pixel-window-content">
              {displayProject && (
              <>
              <div className="project-panel-text">
                <div className="project-title-date">
                  <div className="open-project-title">{displayProject.title}</div>
                  <div className="open-project-date">{displayProject.date}</div>
                </div>
                <p>{displayProject.desc}</p>
                <div className="project-links">
                  {!displayProject.released && (
                    <div>Coming soon...</div>
                  )}
                  
                  
                  {displayProject.links.chrome && (
                    <a href={displayProject.links.chrome} target="_blank">  
                      <div style={{display: "flex", alignItems: "center"}}>
                        <MdOutlineArrowOutward />
                        Chrome Web Store
                      </div>
                    </a>
                  )}
                  {displayProject.links.github && (
                    <a
                      href={displayProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{display: "flex", alignItems: "center"}}>
                        <MdOutlineArrowOutward />
                        GitHub
                      </div>
                      
                    </a>
                  )}
                  {displayProject.links.devpost && (
                    <a
                      href={displayProject.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{display: "flex", alignItems: "center"}}>
                        <MdOutlineArrowOutward />
                        Devpost
                      </div>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-images">
                  {displayProject.images && (
                    <>
                      <div className="image-counter">{currentImage + 1}/{displayProject.images.length}</div>
                      <button onClick={prevImage} className="nav-btn left">←</button>

                      <div className="image-slider">
                        <div
                          className="image-track"
                          style={{
                            transform: `translateX(-${currentImage * 100}%)`,
                          }}
                        >
                          {displayProject.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              className="main-image"
                              alt={`${displayProject.title} ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                      <button onClick={nextImage} className="nav-btn right">→</button>
                    </>
                  )}
                </div>
              </>
              )} 
            </div>
          </div>
        </aside>
      </section>
      </div>
      </div>
    </section>
  );
}
