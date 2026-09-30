import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/" aria-label="Form Validation Using React home">
          <span className="brand-mark" aria-hidden="true">FV</span>
          <span>Form Validation <span className="brand-light">Using React</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/register">Registration</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header