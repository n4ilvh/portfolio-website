import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Portfolio Site",
    desc: "A personal website built to showcase my projects and experiments. Designed with a minimal, responsive layout and custom interactions, and deployed with a custom domain.",
    links: {
      github: "https://github.com/n4ilvh/portfolio-website",
    },
  },
  {
    id: 2,
    title: "unfollowed.exe",
    desc: "A Google Chrome extension that compares your Instagram followers and following lists to reveal which users don’t follow you back, all directly in the browser.",
    links: {
      github: "https://github.com/n4ilvh/unfollowed.exe",
      chrome: "https://chromewebstore.google.com/detail/unfollowedexe/kdkgfkbcjjfohpedofakfeldkoejinpp",
    },
  },
  {
    id: 3,
    title: "Phasmophobia Simulator",
    desc: "A multithreaded C simulation inspired by Phasmophobia, where hunters and a ghost move and act independently. Built to explore concurrency, shared memory, synchronization, and low-level systems programming concepts.",
    links: {
      github: "https://github.com/n4ilvh/phasmophobia-simulator",
    },
  },
  {
    id: 4,
    title: "d4rk mode",
    desc: "A Chrome extension that applies a dark mode effect to websites by dynamically inverting and adjusting page colours, improving readability on sites without native built in themes.",
    links: {
      github: "https://github.com/n4ilvh/d4rk-mode",
    },
  },
    {
    id: 5,
    title: "Opp Detector",
    desc: "A hackathon project that helps users identify potential threats by analyzing real-time data and user input, presented through a simple and accessible interface.",
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
      <div className="projects-title">Projects</div>
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
