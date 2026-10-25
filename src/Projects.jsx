import { useState, useEffect } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Projects.css";


const projects = [
  {
    id: 5,
    title: "NSBE Carleton Website",
    date: "06-2026",
    kind: "Club website",
    role: "Designer & developer",
    tagline: "The official website for Carleton's National Society of Black Engineers",
    desc: "As one of the Tech Coordinators for Carleton University's NSBE chapter, I took lead in designing and developing the chapter's website. Students can see upcoming events, look back at past ones, and learn about the organization.",
    highlights: [
      "Designed the look and layout, then built the full site",
      "Pages for upcoming events, past events, and the chapter itself",
      "Responsive, so it works on phones and desktops",
    ],
    tech: ["React", "JavaScript", "Three.js", "React Three Fiber", "Tailwind CSS", "Motion", "Leaflet"], // TODO: replace with your real stack
    links: {
      website: "https://www.cunsbe.ca/",
    },
    released: true,
    images: [
      "../screenshots/nsbe/1.png",
      "../screenshots/nsbe/2.png",
      "../screenshots/nsbe/3.png",
      "../screenshots/nsbe/4.png",
      "../screenshots/nsbe/5.png",
      "../screenshots/nsbe/6.png",
      "../screenshots/nsbe/7.png",
      "../screenshots/nsbe/8.png",
      "../screenshots/nsbe/9.png",
    ],
  },
  {
    id: 4,
    title: "Portfolio Site",
    date: "10-2025",
    kind: "Personal website",
    role: "Solo project",
    tagline: "The site you're on right now. My project archive.",
    desc: "Instead of a standard template, I wanted my portfolio to have its own personality. I experimented with many design styles until finding a suitable aesthetic. The site includes an animated background, computer windows and an earthy colour scheme.",
    highlights: [
      "Retro desktop interface with windows and interactive elements",
      "Animated dithered background built with Three.js",
      "Responsive layouts for desktop and mobile",
    ],
    tech: ["React", "Vite", "Three.js", "Tailwind CSS"],
    links: {
      github: "https://github.com/n4ilvh/portfolio-website",
    },
    released: true,
    images: [
      "../screenshots/portfolio/1.png",
      "../screenshots/portfolio/2.png",
    ],
  },
  {
    id: 3,
    title: "unfollowed.exe",
    date: "12-2025",
    kind: "Chrome extension",
    role: "Solo project", 
    tagline: "A browser extension that shows who doesn't follow you back on Instagram.",
    desc: "Instagram doesn't make it easy to see who you follow that doesn't follow you back. This has been an annoyance of mine, so I created unfollowed.exe. This extension compares your followers and following lists and shows you the difference in one click. Unlike mobile apps, no login is required which complies with Instagram TOS.",
    highlights: [
      "Comparison runs directly in your browser, built with privacy in mind",
      "Simple one-click experience",
      "Published on the Chrome Web Store",
    ],
    tech: ["JavaScript", "Chrome Extension", "HTML", "CSS"],
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
    id: 2,
    title: "Phasmophobia Simulator",
    date: "12-2025",
    kind: "Course project",
    tagline: "A C program where ghost hunters and a ghost all act at the same time, inspired by the game Phasmophobia.",
    desc: "My final project for COMP 2401 (systems programming). The program simulates a round of the game Phasmophobia with text and icons. Each hunter and the ghost runs as its own thread, so the program has to carefully coordinate who can read and change shared data at any moment.",
    highlights: [
      "Multiple hunters and a ghost running concurrently",
      "Synchronization so threads can safely share data",
      "Hands-on practice with low-level systems programming",
    ],
    tech: ["C", "Multithreading", "Shared memory", "Synchronization"],
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
    id: 1,
    title: "Opp Detector",
    date: "03-2025",
    kind: "Hackathon project",
    role: "Frontend developer",
    tagline: "A hackathon app that uses face recognition to flag people who aren't on an approved list.",
    desc: "Built with a team during a hackathon. The app recognizes faces and checks them against a whitelist. I designed and built the interface that shows the results as they happen.",
    highlights: [
      "Designed and built the frontend",
      "Shows detection results in real time",
      "Focused on an accessible, easy-to-read interface",
    ],
    tech: ["Gadget", "OpenCV", "QNX", "Raspberry Pi", "Python", "Javascript"], 
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
];

const LINK_LABELS = {
  website: "Live site",
  chrome: "Chrome Web Store",
  github: "GitHub",
  devpost: "Devpost",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "03-2025" -> "Mar 2025"
const formatDate = (value) => {
  const [month, year] = value.split("-");
  const name = MONTHS[Number(month) - 1];
  return name ? `${name} ${year}` : value;
};

export default function Projects() {
  // First project is open by default, and one project is always open
  const [activeId, setActiveId] = useState(projects[0].id);
  const [currentImage, setCurrentImage] = useState(0);

  const project = projects.find((p) => p.id === activeId);
  const total = project.images?.length || 0;

  const select = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setCurrentImage(0);
  };

  // Preload screenshots so swapping between them is instant
  useEffect(() => {
    projects.forEach((p) => {
      p.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % total);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + total) % total);

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
                      className={`project-row ${activeId === p.id ? "active" : ""}`}
                      onClick={() => select(p.id)}
                    >
                      <span className="project-title">{p.title}</span>
                      <span className="project-sub">
                        {p.kind} · {formatDate(p.date)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="projects-hint">click a project to see details</div>
              </div>
            </div>
            {/* RIGHT PANEL */}
            <aside className="project-panel">
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
                  <div className="project-detail" key={project.id}>
                    <div className="project-panel-text">
                      <div className="project-title-date">
                        <div className="open-project-title">{project.title}</div>
                        <div className="open-project-date">{formatDate(project.date)}</div>
                      </div>

                      <p className="project-tagline">{project.tagline}</p>

                      <div className="project-meta">
                        {project.kind && <span className="meta-chip">{project.kind}</span>}
                        {project.role && <span className="meta-chip">{project.role}</span>}
                      </div>

                      {total > 0 && (
                        <div className="project-gallery">
                          <div className="gallery-stage">
                            <img
                              key={`${project.id}-${currentImage}`}
                              src={project.images[currentImage]}
                              className="main-image"
                              alt={`${project.title} screenshot ${currentImage + 1} of ${total}`}
                              decoding="async"
                            />
                          </div>
                          <div className="gallery-toolbar">
                            <span>
                              PREVIEW_{String(currentImage + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                            </span>
                            <div className="gallery-buttons">
                              <button type="button" onClick={prevImage} disabled={total < 2} aria-label="Previous screenshot">
                                ←
                              </button>
                              <button type="button" onClick={nextImage} disabled={total < 2} aria-label="Next screenshot">
                                →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="detail-section">
                        <h4>What it is</h4>
                        <p>{project.desc}</p>
                      </div>

                      <div className="detail-section">
                        <h4>What I did</h4>
                        <ul>
                          {project.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4>Built with</h4>
                        <div className="tech-tags">
                          {project.tech.map((t) => (
                            <span key={t} className="tech-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="project-links">
                        {!project.released && <div>Coming soon...</div>}
                        {Object.entries(project.links).map(([key, url]) => (
                          <a key={key} href={url} target="_blank" rel="noopener noreferrer">
                            {LINK_LABELS[key] || key}
                            <MdOutlineArrowOutward />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </section>
  );
}