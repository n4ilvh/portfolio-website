import Image from "../media/selfie.jpg";
import Barcode from "../media/barcode.webp";
import { color } from "three/tsl";
function About() {
  return (
    <div className="about"> 
      {/* <img src={Barcode} alt="description" className="about-barcode-img"/> */}
      <div className="about-container">
        <div className="title-container">
          <div className="about-title">About Me</div>
        <div className="about-underline">+-+-+-+-+</div>
        </div>
        <div className="about-info">
          <div className="about-image-container">
            <img src={Image} alt="description" className="about-img"/>
          </div>
          <div className="about-text">
            <div>location: <span className="about-text-highlight">"Toronto, Canada"</span></div>
            <div>born: <span className="about-text-highlight">2006</span></div>
            <div>school: <span className="about-text-highlight">"Carleton University"</span></div>
            <div className="interests-desktop">
              interests: [
              <span className="about-text-highlight">
                "gaming", "music", "mechanical keyboards", "electric guitar", "basketball"
              </span>
              ]
            </div>
            <div>skills: &#123;</div>
            <div>&nbsp;&nbsp;languages: [<span className="about-text-highlight">"Java", "Python", "C", "HTML", "CSS"</span>],</div>
            <div>&nbsp;&nbsp;frameworks: [<span className="about-text-highlight">"React", "Three.js"</span>],</div>
            <div>&nbsp;&nbsp;tools: [<span className="about-text-highlight">"Git", "Vite" </span>],</div>
            <div>&nbsp;&nbsp;software: [<span className="about-text-highlight">"Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects"</span>]</div>
            <div>&#125;</div>
            {/* //I like computers, clicky keyboards and creatings things that mean something */}
          </div>
        </div>
      </div>
    </div>
    // skills 
  );
}

export default About;