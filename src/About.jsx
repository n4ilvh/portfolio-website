import Image from "../media/selfie.jpg";
import Barcode from "../media/barcode.webp";
import { color } from "three/tsl";
function About() {
  return (
    <div className="about"> 
      {/* <img src={Barcode} alt="description" className="about-barcode-img"/> */}
      <div className="about-container">
        <div className="about-title">about.me</div>
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
            <div className="interests-mobile">
              <div>interests: [</div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"gaming",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"music",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"mechanical keyboards",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"electric guitar",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"basketball"</span>
                </div>
                <div>]</div>
            </div>
            <div>skills: &#123;</div>
            <div>&nbsp;&nbsp;languages: [<span className="about-text-highlight">"Java", "Python", "C", "HTML, CSS"</span>],</div>
            <div>&nbsp;&nbsp;frameworks: [<span className="about-text-highlight">"React", "Three.js"</span>],</div>
            <div>&nbsp;&nbsp;tools: [<span className="about-text-highlight">"Git", "Vite" </span>],</div>
            <div className="interests-desktop">
              <div>&nbsp;&nbsp;applications: [<span className="about-text-highlight">"Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects" </span>]</div>
            </div>
            <div className="interests-mobile">
                <div>applications: [</div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"Adobe Photoshop",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"Adobe Premiere Pro",</span>
                </div>
                <div className="about-indent">
                  <span className="about-text-highlight">&nbsp;&nbsp;"Adobe After Effects"</span>
                </div>
                <div>]</div>
            </div>
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