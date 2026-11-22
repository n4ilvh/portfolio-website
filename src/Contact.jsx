import { useState } from "react";
import { VscChromeRestore, VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineArrowOutward } from "react-icons/md";
import "./Contact.css";

const email = "nailah.abel@gmail.com";
const links = [
  { name: "Email", value: email, href: `mailto:${email}`, icon: MdOutlineEmail },
  { name: "GitHub", value: "github.com/n4ilvh", href: "https://github.com/n4ilvh", icon: SiGithub },
  { name: "LinkedIn", value: "linkedin.com/in/nailah-abel", href: "https://www.linkedin.com/in/nailah-abel/", icon: FaLinkedin },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); }
    catch { window.location.href = `mailto:${email}`; }
  }
  return <section className="contact-page" id="contact" aria-labelledby="contact-heading">
    <div className="contact-inner">
      <p className="contact-eyebrow">// end of file</p>
      <h2 className="contact-heading" id="contact-heading">Contact</h2>
      <p className="contact-intro">Have a project, opportunity, or just want to say hi? I'd love to hear from you.</p>
      <div className="contact-window">
        <div className="contact-window-bar"><span>send_message.exe</span><div aria-hidden="true"><VscChromeMinimize /><VscChromeRestore /><VscChromeClose /></div></div>
        <div className="contact-window-body">
          <p className="contact-status"><span aria-hidden="true" className="contact-status-dot" /> OPEN TO INTERNSHIPS & CO-OP OPPORTUNITIES</p>
          <h3>Let's connect<span className="contact-cursor" aria-hidden="true">_</span></h3>
          <p className="contact-description">I'm always interested in learning, collaborating, and building something new.</p>
          <div className="contact-actions">
            <a className="contact-primary" href={`mailto:${email}`}>Send an email <MdOutlineArrowOutward aria-hidden="true" /></a>
            <button type="button" onClick={copyEmail}>{copied ? "Email copied!" : "Copy email"}</button>
          </div>
          <div className="contact-links">{links.map(({name,value,href,icon:Icon}) => <a key={name} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}><Icon aria-hidden="true" /><span><strong>{name}</strong><small>{value}</small></span><MdOutlineArrowOutward className="contact-external" aria-hidden="true" /></a>)}</div>
        </div>
      </div>
      <footer className="contact-footer"><span>© {new Date().getFullYear()} Nailah Abel</span><a href="#home">back to top ↑</a></footer>
    </div>
  </section>;
}
