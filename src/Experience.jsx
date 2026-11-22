import { useState } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { MdOutlineArrowOutward } from "react-icons/md";
import AsciiBloom from "./AsciiBloom";
import "./Experience.css";

// Replace dates marked "Confirm dates" before publishing.
// The unverified Automation & Property Technology Assistant role is omitted.
const experience = [
  {
    id: "carleton",
    title: "Carleton University",
    type: "Education",
    company: "Bachelor of Computer Science (Honours) · Cybersecurity Stream (Co-op)",
    date: "2024 – Present",
    location: "Ottawa, ON",
    desc: "Studying Computer Science with a focus on cybersecurity. Relevant coursework includes Data Structures & Algorithms, Systems Programming, Software Engineering, Applied Cryptography, Web Development, and Database Management Systems.",
    tech: ["Java", "Python", "C", "C++", "JavaScript", "SQL"],
  },
  {
    id: "nsbe",
    title: "Tech Coordinator",
    type: "Technical",
    company: "NSBE Carleton",
    date: "Jun 2026 - Present",
    location: "Ottawa, ON",
    desc: "Designed and built the website for Carleton's National Society of Black Engineers chapter, giving students a central place to explore events, past activities, and information about the organization.",
    tech: ["Web Development", "UI Design"],
    link: { label: "View the website", url: "https://www.cunsbe.ca/" },
  },
  {
    id: "12gates",
    title: "Digital Operations & Automation Assistant",
    type: "Technical",
    company: "12 Gates Property Services",
    date: "Jul 2026 - Aug 2026",
    location: "Remote / Toronto, ON",
    desc: "Supported digital transformation initiatives through AI-assisted workflow development, automation research, and process optimization. Evaluated digital tools, developed standard operating procedures (SOPs), and created documentation and reusable AI prompts to improve operational efficiency.",
    tech: ["AI Tools", "Workflow Design", "ElevenLabs"],
  },
  {
    id: "piano",
    title: "Piano Teacher",
    type: "Other",
    company: "City of Toronto",
    date: "Apr 2026 - Present",
    location: "Toronto, ON",
    desc: "Taught piano lessons, adapting instruction to students' skill levels and helping them develop technique, confidence, and foundational music skills.",
    tech: ["Teaching", "Communication", "Adaptability"],
  },
  {
    id: "camp",
    title: "Camp Counsellor",
    type: "Other",
    company: "City of Toronto",
    date: "May 2025 - Present",
    location: "Toronto, ON",
    desc: "Planned and supervised activities for children while maintaining a safe, inclusive, and engaging environment.",
    tech: ["Leadership", "Teamwork", "Problem Solving"],
  },

  {
    id: "marketing",
    title: "Marketing Assistant",
    type: "Other",
    company: "EXP Realty",
    date: "Aug 2022 - Sep 2024",
    location: "Toronto, ON",
    desc: "Edited real estate marketing videos and created digital content to support property promotion and online marketing.",
    tech: ["Video Editing", "Digital Media", "Content Creation"],
  },
];

const filters = ["All", "Technical", "Education", "Other"];

export default function Experience() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState(experience[0].id);

  const visible = filter === "All"
    ? experience
    : experience.filter((item) => item.type === filter);

  // Always show details for an entry that's currently visible.
  const selected = visible.find((item) => item.id === activeId) ?? visible[0];

  return (
    <section className="experience" id="experience" aria-labelledby="experience-heading">
      <AsciiBloom maxBlooms={4} />
      <div className="experience-container">
        <h2 className="experience-title" id="experience-heading">
          Education <span>&amp;</span> Experience
        </h2>

        <div className="experience-layout">
          <div className="exp-window">
            <div className="exp-window-header">
              <span>career_history.exe</span>
              <div className="exp-window-controls" aria-hidden="true">
                <VscChromeMinimize />
                <VscChromeRestore />
                <VscChromeClose />
              </div>
            </div>

            <div className="exp-filters" role="group" aria-label="Filter experience">
              {filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`exp-filter ${filter === option ? "active" : ""}`}
                  aria-pressed={filter === option}
                  onClick={() => {
                    setFilter(option);
                    const first = option === "All"
                      ? experience[0]
                      : experience.find((item) => item.type === option);
                    if (first) setActiveId(first.id);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <ol className="timeline" aria-label="Select an experience">
              {visible.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={selected.id === item.id}
                    className={`timeline-item ${selected.id === item.id ? "active" : ""} ${item.type === "Education" ? "education-item" : ""}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="timeline-date">{item.date}</span>
                    <span className="timeline-title">{item.title}</span>
                    <span className="timeline-company">{item.company}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="exp-hint">click an entry to see details</p>
          </div>

          <article className="exp-window exp-detail" key={selected.id} aria-live="polite">
            <div className="exp-window-header">
              <span>entry_details.exe</span>
              <div className="exp-window-controls" aria-hidden="true">
                <VscChromeMinimize />
                <VscChromeRestore />
                <VscChromeClose />
              </div>
            </div>

            <div className="experience-content">
              <div className="experience-header">
                <h3>{selected.title}</h3>
                <span className="experience-type">{selected.type}</span>
              </div>
              <div className="experience-subtitle">{selected.company}</div>
              <div className="experience-date">
                {selected.date} <span aria-hidden="true">·</span> {selected.location}
              </div>
              <div className="experience-section">
                <h4>{selected.type === "Education" ? "Academic background" : "About"}</h4>
                <p>{selected.desc}</p>
              </div>
              <div className="experience-section">
                <h4>{selected.type === "Education" ? "Languages & technologies" : "Skills used"}</h4>
                <div className="experience-tags">
                  {selected.tech.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
              {selected.link && (
                <div className="experience-links">
                  <a href={selected.link.url} target="_blank" rel="noopener noreferrer">
                    {selected.link.label}
                    <MdOutlineArrowOutward aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
