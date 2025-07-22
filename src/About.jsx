import './styles/About.css';

const About = () => {
    return (
        <div className="about">
          <div className="about-content">
  <h2>👋 Meet Your Ultimate HR Management Tool</h2>
  <p>
    Welcome to a streamlined platform designed for managing employee data with speed and simplicity.
    Easily add new employees, view detailed profiles, and track team growth—all in one place.
  </p>
  <p>
    Built with the power of <strong>React</strong>, this app delivers real-time updates, seamless navigation,
    and a clean, responsive interface to make HR tasks effortless.
  </p>
  <p>
    Whether you're launching a small team or growing fast, this solution is crafted to make your
    human resource operations smooth and effective.
  </p>
  <div className="tech-stack">
    <h3>Built With</h3>
    <ul>
      <li>React</li>
      <li>React Router</li>
      <li>Vite</li>
      <li>Modern JavaScript (ES6+)</li>
      <li>CSS Modules</li>
    </ul>
  </div>
</div>

        </div>
    );
};

export default About;
