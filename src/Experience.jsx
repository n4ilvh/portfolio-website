import { useState, useEffect, useRef } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { MdOutlineArrowOutward } from "react-icons/md";
import "./Experience.css";

const experience = [
  {
    id: 1,
    title: "Carleton University",
    type: "Education",
    company: "Bachelor of Computer Science",
    date: "2024 - Present",
    location: "Ottawa, ON",
    desc:
      "Honours Computer Science (Cybersecurity Stream). Relevant coursework includes Data Structures, Systems Programming and Discrete Mathematics.",
    tech: [
      "Java",
      "Python",
      "C",
      "React",
      "Git"
    ]
  },
  {
    id: 2,
    title: "Camp Counsellor",
    type: "Work",
    company: "City of Toronto",
    date: "2025 - Present",
    location: "Toronto, ON",
    desc:
      "Planned and supervised activities for children aged 6–9 while maintaining a safe and engaging environment.",
    tech: [
      "Leadership",
      "Communication",
      "Problem Solving"
    ]
  },
  {
    id: 3,
    title: "Soccer Coach",
    type: "Work",
    company: "West Rouge Soccer Club",
    date: "2025 - Present",
    location: "Toronto, ON",
    desc:
      "Coached youth soccer while organizing drills and encouraging teamwork.",
    tech: [
      "Leadership",
      "Coaching",
      "Planning"
    ]
  }
];

export default function Experience() {
    const [active, setActive] = useState(1); // first item selected by default

    const selected = experience.find(item => item.id === active);

    return (
        <div className="pixel-window2">

    <div className="pixel-window-header">
        <span>resume_entry.exe</span>

        <div className="window-controls">
            <VscChromeMinimize />
            <VscChromeRestore />
            <VscChromeClose />
        </div>

    </div>

    <div className="pixel-window-content">

        {selected && (

        <div className="experience-content">

            <div className="experience-header">

                <h2>{selected.title}</h2>

                <span>{selected.type}</span>

            </div>

            <div className="experience-subtitle">

                {selected.company}

            </div>

            <div className="experience-date">

                {selected.date} • {selected.location}

            </div>

            <p>

                {selected.desc}

            </p>

            <div className="experience-tags">

                {selected.tech.map((skill) => (

                    <span key={skill}>

                        {skill}

                    </span>

                ))}

            </div>

        </div>

        )}

    </div>

</div>
    );
}