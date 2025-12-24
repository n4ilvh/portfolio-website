import Image from "../media/selfie.jpg";
function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-image-container">
          <img src={Image} alt="description" className="about-img"/>
        </div>
        <div className="about-info">
          <div className="about-title">About Me</div>
          <div className="about-text">
            <div>location: "Toronto, Canada"</div>
            <div>born: 2006</div>
            <div>interests: ["gaming", "music", "mechanical keyboards", "electric guitar", "basketball"]</div>
            <div>school: "Carleton University"</div>
            <div>skills: &#123;</div>
            <div>&nbsp;&nbsp;languages: ["Java", "Python", "C", "HTML, CSS"],</div>
            <div>&nbsp;&nbsp;frameworks: ["React", "Three.js"],</div>
            <div>&nbsp;&nbsp;tools: ["Git", "Vite"],</div>
            <div>&nbsp;&nbsp;focus: ["Creative Coding", "Interactive Systems"]</div>
            <div>&#125;</div>
          </div>
        </div>
      </div>
    </div>

    // skills 
  );
}

export default About;
