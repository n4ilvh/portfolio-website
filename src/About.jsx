import Image from "../media/selfie.jpg";
import Barcode from "../media/barcode.webp";
function About() {
  return (
    <div className="about"> 
   
      {/* <img src={Barcode} alt="description" className="about-barcode-img"/> */}

      {/* <div className="about-title">About</div> */}
      <div className="about-container">
        <div className="about-image-container">
          <img src={Image} alt="description" className="about-img"/>
        </div>
        
          <div className="about-text">
            <div>location: "Toronto, Canada"</div>
            <div>born: 2006</div>
            <div>school: "Carleton University"</div>
            <div>interests: ["gaming", "music", "mechanical keyboards", "electric guitar", "basketball"]</div>
            <div>skills: &#123;</div>
            <div>&nbsp;&nbsp;languages: ["Java", "Python", "C", "HTML, CSS"],</div>
            <div>&nbsp;&nbsp;frameworks: ["React", "Three.js"],</div>
            <div>&nbsp;&nbsp;tools: ["Git", "Vite"],</div>
            <div>&#125;</div>
            {/* //I like computers, clicky keyboards and creatings things that mean something */}
          
        </div>
      </div>
    </div>

    // skills 
  );
}

export default About;
