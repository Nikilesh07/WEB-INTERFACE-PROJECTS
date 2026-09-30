import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import HomePage from './pages/HomePage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import SuccessPage from './pages/SuccessPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Form Validation Using React</span>
          <span>College project simulation · No government affiliation</span>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App
