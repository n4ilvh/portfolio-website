import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    desc: "My personal website to display projects.",
    links: {
      github: "https://github.com/n4ilvh/portfolio-website",
    },
  },
  {
    id: 2,
    title: "unfollowed.exe",
    desc: "A Google Chrome extension that reveals which Instagram users are not following you back.",
    links: {
      github: "https://github.com/n4ilvh/unfollowed.exe",
      chrome: "https://chromewebstore.google.com/detail/unfollowedexe/kdkgfkbcjjfohpedofakfeldkoejinpp",
    },
  },
  {
    id: 3,
    title: "Phasmophobia Simulator",
    desc: "A final project for one of my university courses.",
    links: {
      github: "https://github.com/n4ilvh/phasmophobia-simulator",
    },
  },
  {
    id: 4,
    title: "d4rk mode",
    desc: "A Google Chrome extension that inverts website background colours to create a dark mode effect.",
    links: {
      github: "https://github.com/n4ilvh/d4rk-mode",
    },
  },
    {
    id: 5,
    title: "Opp Detector",
    desc: "A hackathon project.",
    links: {
      devpost: "https://devpost.com/software/opp-detector",
    },
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  const toggle = (id) => {
    setActive(active === id ? null : id);
  };

  const activeProject = projects.find(p => p.id === active);

  return (
    <div className="projects">
      <div className="about-title">Projects</div>
        <section className="projects-layout">
      {/* LEFT LIST */}
      <div className="projects-list">
        {projects.map((p) => (
          <div
            key={p.id}
            className={`project-row ${active === p.id ? "active" : ""}`}
            onClick={() => toggle(p.id)}
          >
            <div className="project-box" />
            <span className="project-title">{p.title}</span>
          </div>
        ))}
      </div>

{/* RIGHT PANEL */}
      {activeProject && (
        <aside className="project-panel">
          <h2>{activeProject.title}</h2>
          <p>{activeProject.desc}</p>

          <div className="project-links">
            {activeProject.links.chrome && (
              <a href={activeProject.links.chrome} target="_blank">
                Chrome Web Store
              </a>
            )}
            
            {activeProject.links.github && (
              <a
                href={activeProject.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}

            {activeProject.links.devpost && (
              <a
                href={activeProject.links.devpost}
                target="_blank"
                rel="noopener noreferrer"
              >
                Devpost
              </a>
            )}

            
          </div>
        </aside>
      )}
    </section>
    
    
    
    </div>

  );
}
