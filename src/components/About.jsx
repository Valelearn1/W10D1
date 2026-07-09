import aboutImage from "../assets/fantasy books.jpg";

const About = () => (
  <div
    className="about-hero text-center"
    style={{ "--about-bg": `url("${aboutImage}")` }}
  >
    <div className="about-content">
      <h2>Chi siamo</h2>
      <p>
        EpiBooks è un progetto nato per scoprire libri fantasy e condividere
        recensioni con altri lettori appassionati.
      </p>
    </div>
  </div>
);

export default About;
