import './App.css'
import heroImg from './assets/hero.png'

const stats = [
  { label: 'Projects', value: '18+' },
  { label: 'Internships', value: '4' },
  { label: 'Skills', value: '12' },
]

const skills = [
  'HTML & CSS',
  'JavaScript',
  'React',
  'Responsive Design',
  'UI/UX Basics',
  'Git & GitHub',
]

const projects = [
  {
    title: 'Campus Connect',
    description: 'A student community web app focused on events, announcements, and collaboration.',
    tag: 'Web App',
  },
  {
    title: 'Portfolio Showcase',
    description: 'A modern personal portfolio designed to present work, achievements, and contact details clearly.',
    tag: 'Portfolio',
  },
  {
    title: 'E-Commerce Landing Page',
    description: 'A conversion-focused storefront homepage with product highlights and responsive sections.',
    tag: 'UI Design',
  },
]

function App() {
  return (
    <div className="portfolio-app">
      <header className="topbar">
        <div className="brand">NP</div>
        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">Student • Frontend Developer</p>
            <h1>
              Hi, I'm <span>Nikilesh Prakash</span>
              <br />
              Building digital experiences.
            </h1>
            <p className="lead">
              I design and develop responsive websites that are clean, user-friendly,
              and built to leave a strong impression.
            </p>

            <div className="hero__actions">
              <a href="#projects" className="btn btn--primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn--secondary">
                Contact Me
              </a>
            </div>

            <ul className="stats" aria-label="Personal statistics">
              {stats.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual" aria-label="Profile illustration">
            <div className="profile-card">
              <img src={heroImg} alt="Student portrait illustration" />
              <div className="profile-badge">Available for internships</div>
            </div>
          </div>
        </section>

        <section id="about" className="info-section">
          <div className="section-heading">
            <p className="eyebrow">About me</p>
            <h2>Focused on learning, creating, and improving.</h2>
          </div>

          <div className="about-grid">
            <p>
              I am a student developer passionate about modern web design, problem-solving,
              and building experiences that feel intuitive on every screen. My goal is to blend
              creativity with practical functionality.
            </p>
            <div className="about-card">
              <h3>Currently learning</h3>
              <p>React, responsive UI design, accessibility, and frontend performance.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="info-section">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Tools and technologies I use.</h2>
          </div>

          <div className="skill-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-item">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="info-section">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Recent work and ideas in progress.</h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <span className="project-tag">{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-box">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s build something great together.</h2>
          </div>
          <a href="mailto:your.email@example.com" className="btn btn--primary">
            your.email@example.com
          </a>
        </section>
      </main>
    </div>
  )
}

export default App
