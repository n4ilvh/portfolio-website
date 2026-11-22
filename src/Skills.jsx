import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { SiGithub } from "react-icons/si";
import "./Skills.css";

const groups = [
  { name: "Languages", items: ["Python", "Java", "C", "C++", "JavaScript", "SQL"] },
  { name: "Frontend", items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { name: "Backend & Databases", items: ["Node.js", "Express", "MongoDB"] },
  { name: "Tools & Workflow", items: ["Git", "GitHub", "VS Code", "Google Workspace"] },
];
const githubUsername = "n4ilvh";
const theme = {
  light: ["#6b896d", "#dac19f", "#c0a98d", "#ad8f70", "#a1856e"],
};

function WindowBar({ name }) {
  return <div className="skills-window-bar"><span>{name}</span><div aria-hidden="true"><VscChromeMinimize /><VscChromeRestore /><VscChromeClose /></div></div>;
}

export default function Skills() {
  const [selected, setSelected] = useState("All");
  const visible = selected === "All" ? groups : groups.filter(group => group.name === selected);
  return (
    <section className="skills-page" id="skills" aria-labelledby="skills-heading">
      <div className="skills-inner">
        <h2 id="skills-heading" className="skills-heading">Skills</h2>
        <div className="skills-window">
          <WindowBar name="technical_skills.exe" />
          <div className="skills-window-body">
            <div className="skills-filters" role="group" aria-label="Filter skills">
              {["All", ...groups.map(group => group.name)].map(name => (
                <button key={name} type="button" className={selected === name ? "is-active" : ""} aria-pressed={selected === name} onClick={() => setSelected(name)}>{name}</button>
              ))}
            </div>
            <div className="skills-groups">
              {visible.map(group => <div className="skills-group" key={group.name}>
                <h3>// {group.name}</h3>
                <div className="skills-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div>
              </div>)}
            </div>
          </div>
        </div>
        <div className="skills-window skills-github-window">
          <WindowBar name="github_activity.exe" />
          <div className="skills-window-body">
            <div className="skills-github-heading"><h3>Contribution activity</h3><a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer"><SiGithub aria-hidden="true" /> View GitHub <span aria-hidden="true">↗</span></a></div>
            <div className="skills-calendar-scroll"><GitHubCalendar username={githubUsername} colorScheme="light" theme={theme} blockSize={11} blockMargin={4} fontSize={12} /></div>
            <p className="skills-footnote">A snapshot of public GitHub activity, not a complete record of my work.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
