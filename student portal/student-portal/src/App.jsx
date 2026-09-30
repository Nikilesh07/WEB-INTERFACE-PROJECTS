import './App.css'
import StudentPortal from './StudentPortal'

function App() {
  return (
    <div className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Student Portfolio Dashboard</p>
        <h1>Project 2</h1>
      </header>

      <main className="main-content">
        <StudentPortal />
      </main>
    </div>
  )
}

export default App
