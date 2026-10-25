import { useState } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Experience.css";

// Newest first. Anything marked TODO is a placeholder or guess, so please check it.
const experience = [
  {
    id: 4,
    title: "Tech Coordinator",
    type: "Leadership", // TODO: Leadership / Volunteer / Club?
    company: "NSBE Carleton",
    date: "20XX - Present", // TODO: add your real dates
    location: "Ottawa, ON", // TODO: confirm
    desc: "Creating a website for Carleton NSBE was one of my roles as a Tech Coordinator. I designed and built the website for Carleton's chapter, so students have one place to see upcoming events, look back at past ones, and learn about the organization.",
    tech: ["Web development", "UI design", "Leadership"], // TODO: confirm
    link: { label: "View the website", url: "https://www.cunsbe.ca/" },
  },
  {
    id: 2,
    title: "Camp Counsellor",
    type: "Work",
    company: "City of Toronto",
    date: "2025 - Present",
    location: "Toronto, ON",
    desc: "Planned and supervised activities for children aged 6–9 while maintaining a safe and engaging environment.",
    tech: ["Leadership", "Communication", "Problem Solving"],
  },
  {
    id: 3,
    title: "Soccer Coach",
    type: "Work",
    company: "West Rouge Soccer Club",
    date: "2025 - Present",
    location: "Toronto, ON",
    desc: "Coached youth soccer while organizing drills and encouraging teamwork.",
    tech: ["Leadership", "Coaching", "Planning"],
  },
  {
    id: 1,
    title: "Carleton University",
    type: "Education",
    company: "Bachelor of Computer Science",
    date: "2024 - Present",
    location: "Ottawa, ON",
    desc: "Honours Computer Science (Cybersecurity Stream). Relevant coursework includes Data Structures, Systems Programming and Discrete Mathematics.",
    tech: ["Java", "Python", "C", "React", "Git"],
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState(experience[0].id); // first entry open by default
  const selected = experience.find((item) => item.id === activeId) || experience[0];

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <h2 className="experience-title">Experience</h2>

        <div className="experience-layout">
          {/* LEFT: TIMELINE */}
          <div className="exp-window">
            <div className="exp-window-header">
              <span>experience_log.exe</span>
              <div className="exp-window-controls" aria-hidden="true">
                <VscChromeMinimize />
                <VscChromeRestore />
                <VscChromeClose />
              </div>
            </div>

            <ol className="timeline" aria-label="Select an experience">
              {experience.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-pressed={activeId === item.id}
                    className={`timeline-item ${activeId === item.id ? "active" : ""}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="timeline-date">{item.date}</span>
                    <span className="timeline-title">{item.title}</span>
                    <span className="timeline-company">{item.company}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="exp-hint">click an entry to see details</div>
          </div>

          {/* RIGHT: DETAILS */}
          <article className="exp-window exp-detail" key={selected.id}>
            <div className="exp-window-header">
              <span>resume_entry.exe</span>
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
                <h4>About</h4>
                <p>{selected.desc}</p>
              </div>

              <div className="experience-section">
                <h4>Skills used</h4>
                <div className="experience-tags">
                  {selected.tech.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
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