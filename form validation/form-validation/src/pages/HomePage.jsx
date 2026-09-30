import { Link } from 'react-router-dom'

const features = [
  { number: '01', title: 'Clear field guidance', text: 'Helpful, specific messages appear beside each field so it is easy to correct an entry.' },
  { number: '02', title: 'Checks as you type', text: 'Input formats and required information are checked before the application is submitted.' },
  { number: '03', title: 'Privacy by design', text: 'This demonstration runs in your browser. No form data is sent to a server or saved.' },
]

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> DIGITAL SERVICE · DEMONSTRATION</p>
            <h1>Form Validation<br /><span>Using React</span></h1>
            <p className="hero-description">
              A practical application form demonstrating accessible, real-time validation for a clear and confident submission experience.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/register">Start application <span aria-hidden="true">→</span></Link>
              <span className="hero-note">Takes about 5 minutes</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Application form preview">
            <div className="visual-topline"><span>APPLICATION FORM</span><span>01 / 03</span></div>
            <div className="visual-progress"><span /></div>
            <div className="visual-row"><span className="visual-label">Full name</span><span className="visual-entry">Your name as it appears on records</span></div>
            <div className="visual-row"><span className="visual-label">Date of birth</span><span className="visual-entry">DD / MM / YYYY</span></div>
            <div className="visual-row"><span className="visual-label">Mobile number</span><span className="visual-entry visual-valid">+91 &nbsp; 98765 43210 <span aria-hidden="true">✓</span></span></div>
            <div className="visual-foot"><span className="status-dot" /> All information stays in this browser</div>
            <span className="visual-index" aria-hidden="true">01</span>
          </div>
        </div>
        <div className="hero-bottom container"><span>BUILT FOR CLARITY</span><span>REACT · ACCESSIBLE · CLIENT-SIDE</span></div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">A BETTER WAY TO APPLY</p><h2>Every detail, checked.</h2></div>
            <p>Designed as a college project simulation. This is not an official government service and does not verify identity with any government database.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-item" key={feature.number}>
                <span className="feature-number">{feature.number}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
          <div className="home-cta"><span>Ready to begin?</span><Link to="/register">Go to registration <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    </div>
  )
}

export default HomePage