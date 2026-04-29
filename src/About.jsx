import Image from "../media/selfie.jpg";
import Border from "../media/border.png";
import LeftBlob from "../media/left-blob.png"
import RightBlob from "../media/right-blob.png"
function About() {
  return (
    <div className="about"> 
      {/* <img src={Barcode} alt="description" className="about-barcode-img"/> */}
      <img src={LeftBlob} alt="description" className="left-blob"/>
      <img src={RightBlob} alt="description" className="left-blob"/>
      <div className="about-container">
        <div className="title-container">
          <div className="about-title">About Me</div>
        </div>
        <div className="about-info">
          
          <div className="about-image-container">
            <img src={Border} alt="description" className="img-border"/>
            <img src={Image} alt="description" className="about-img"/>
          </div>
          <div className="about-text">
            <div className="noise-shadow">location: <span className="about-text-highlight">"Toronto, Canada"</span></div>
            <div>born: <span className="about-text-highlight">2006</span></div>
            <div>school: <span className="about-text-highlight">"Carleton University"</span></div>
            <div className="skills-desktop">
              interests: [
              <span className="about-text-highlight">
                "gaming", "music", "mechanical keyboards", "electric guitar", "basketball"
              </span>
              ]
            
              <div>skills: &#123;</div>
              <div>&nbsp;&nbsp;languages: [<span className="about-text-highlight">"Java", "Python", "C", "HTML", "CSS"</span>],</div>
              <div>&nbsp;&nbsp;frameworks: [<span className="about-text-highlight">"React", "Three.js"</span>],</div>
              <div>&nbsp;&nbsp;tools: [<span className="about-text-highlight">"Git", "Vite" </span>],</div>
              <div>&nbsp;&nbsp;software: [<span className="about-text-highlight">"Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects"</span>]</div>
            </div>



            {/* max 480px */}
            <div className="max480">
              interests: [
              <span className="about-text-highlight">
                "gaming", "music", "mechanical keyboards", "electric guitar", "basketball"
              </span>
              ]
            
              <div>skills: &#123;</div>
              <div>&nbsp;&nbsp;languages: [<span className="about-text-highlight">"Java", "Python", "C", "HTML", "CSS"</span>],</div>
              <div>&nbsp;&nbsp;frameworks: [<span className="about-text-highlight">"React", "Three.js"</span>],</div>
              <div>&nbsp;&nbsp;tools: [<span className="about-text-highlight">"Git", "Vite" </span>],</div>
              <div>&nbsp;&nbsp;software: [<span className="about-text-highlight">"Adobe Photoshop", "Adobe Premiere Pro", "Adobe After Effects"</span>]</div>
            </div>

            <div className="skills-mobile">
              interests: [
              <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"gaming",</span>
              <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"music",</span>
              <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"mechanical keyboards",</span>
              <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"electric guitar",</span>
              <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"basketball",</span>
              <br></br>     
              ]
            
              <div>skills: &#123;</div>
              <div>&nbsp;&nbsp;languages: [
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"Java", "</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"Python",</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"C",</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"HTML",</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"CSS"</span></div>
              &nbsp;&nbsp;]
              <div>&nbsp;&nbsp;frameworks: [<span className="about-text-highlight">"React", "Three.js"</span>],</div>
              <div>&nbsp;&nbsp;tools: [<span className="about-text-highlight">"Git", "Vite" </span>],</div>
              <div>&nbsp;&nbsp;software: [
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"Adobe Photoshop",</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"Adobe Premiere Pro",</span>
                <span className="about-text-highlight"><br></br>&nbsp;&nbsp;&nbsp;&nbsp;"Adobe After Effects"</span>
              <br></br>&nbsp;&nbsp;]
              </div>
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