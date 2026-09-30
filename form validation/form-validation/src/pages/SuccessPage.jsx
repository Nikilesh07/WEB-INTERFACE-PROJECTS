import { Link, useLocation } from 'react-router-dom'

function createReference() {
  return `FV-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`
}

function SuccessPage() {
  const location = useLocation()
  const reference = location.state?.reference || createReference()

  return (
    <section className="success-page container" aria-labelledby="success-heading">
      <div className="success-card">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="eyebrow">SUBMISSION COMPLETE</p>
        <h1 id="success-heading">Application Submitted Successfully</h1>
        <p className="success-copy">Your demonstration application has passed all form checks. This project does not submit information to any government service.</p>
        <div className="reference-box"><span>Application reference</span><strong>{reference}</strong><small>For this browser session only</small></div>
        <div className="success-actions">
          <Link className="button button-primary" to="/">Return home</Link>
          <Link className="button button-secondary" to="/register">Start a new application</Link>
        </div>
      </div>
    </section>
  )
}

export default SuccessPage