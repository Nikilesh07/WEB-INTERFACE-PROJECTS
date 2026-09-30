import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

const semesters = {
  1: { label: 'Semester 1', period: 'Aug 2024 - Dec 2024', gpa: '7.7', credits: '22', subjects: [['Mathematics for Computing', 'MAT101', '88', 'A', '4'], ['Programming Fundamentals', 'CSE101', '92', 'A+', '4'], ['Digital Logic Design', 'CSE102', '84', 'A', '3'], ['Communication Skills', 'ENG101', '79', 'B+', '3'], ['Physics for Engineers', 'PHY101', '81', 'A', '4'], ['Engineering Workshop', 'MEC101', '76', 'B+', '4']] },
  2: { label: 'Semester 2', period: 'Jan 2025 - May 2025', gpa: '7.8', credits: '22', subjects: [['Data Structures', 'CSE201', '94', 'A+', '4'], ['Object Oriented Programming', 'CSE202', '91', 'A+', '4'], ['Discrete Mathematics', 'MAT201', '87', 'A', '4'], ['Database Management Systems', 'CSE203', '89', 'A', '3'], ['Operating Systems', 'CSE204', '85', 'A', '4'], ['Professional Ethics', 'HUM201', '78', 'B+', '3']] },
  3: { label: 'Semester 3', period: 'Aug 2025 - Dec 2025', gpa: '8.0', credits: '24', subjects: [['Design and Analysis of Algorithms', 'CSE301', '96', 'A+', '4'], ['Computer Networks', 'CSE302', '93', 'A+', '4'], ['Software Engineering', 'CSE303', '90', 'A+', '3'], ['Web Technologies', 'CSE304', '95', 'A+', '4'], ['Probability and Statistics', 'MAT301', '86', 'A', '3'], ['Mini Project', 'CSE305', '92', 'A+', '6']] },
}

const navItems = [{ to: '/semester-1', label: 'Semester 1', number: '01' }, { to: '/semester-2', label: 'Semester 2', number: '02' }, { to: '/semester-3', label: 'Semester 3', number: '03' }, { to: '/overall', label: 'Overall CGPA', number: '04' }]

function Sidebar() {
  const location = useLocation()
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark">SC</div><div><strong>STUDENT<br />CENTRE</strong><span>Academic records</span></div></div>
    <div className="sidebar-section-label">Report views</div>
    <nav className="nav-list" aria-label="Report card sections">{navItems.map((item) => <NavLink className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} key={item.to} to={item.to}><span className="nav-number">{item.number}</span><span>{item.label}</span><span className="nav-arrow">&#8594;</span></NavLink>)}</nav>
    <div className="sidebar-footer"><span className="status-dot" /><div><strong>Record updated</strong><span>24 December 2025</span></div></div>
    <span className="route-hint">{location.pathname.replace('/', '').replace('-', ' ') || 'overall'}</span>
  </aside>
}

function StudentHeader({ eyebrow }) {
  return <header className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>Academic transcript</h1><p className="header-copy">A clear view of your progress, one term at a time.</p></div><div className="student-chip"><div className="avatar">NP</div><div><strong>Nikilesh Prakash</strong><span>CS-2024-0187 · Computer Science</span></div></div></header>
}

function Metric({ label, value, detail, accent }) {
  return <div className={`metric ${accent ? 'metric-accent' : ''}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
}

function SubjectTable({ subjects }) {
  return <div className="table-wrap"><table><thead><tr><th>Subject</th><th>Code</th><th>Marks</th><th>Grade</th><th>Credits</th></tr></thead><tbody>{subjects.map(([subject, code, marks, grade, credits]) => <tr key={code}><td><strong>{subject}</strong></td><td className="muted">{code}</td><td>{marks}<span className="out-of"> / 100</span></td><td><span className={`grade grade-${grade.replace('+', 'plus')}`}>{grade}</span></td><td>{credits}</td></tr>)}</tbody></table></div>
}

function SemesterPage({ semester }) {
  const totalMarks = semester.subjects.reduce((sum, subject) => sum + Number(subject[2]), 0)
  const average = Math.round(totalMarks / semester.subjects.length)
  return <><StudentHeader eyebrow={`${semester.label} / ${semester.period}`} /><div className="metrics"><Metric label="Semester GPA" value={semester.gpa} detail="Out of 10.00" accent /><Metric label="Average marks" value={`${average}%`} detail="Across all subjects" /><Metric label="Credits earned" value={semester.credits} detail="Credits completed" /></div><section className="report-section"><div className="section-heading"><div><p className="eyebrow">Results breakdown</p><h2>{semester.label} subjects</h2></div><span className="section-meta">{semester.subjects.length} subjects</span></div><SubjectTable subjects={semester.subjects} /></section><p className="footnote">Grades are calculated according to the university academic regulations. Marks shown are final.</p></>
}

function OverallPage() {
  const allSubjects = Object.values(semesters).flatMap((semester) => semester.subjects)
  const overallGpa = ((7.7 + 7.8 + 8.0) / 3).toFixed(2)
  return <><StudentHeader eyebrow="Overall standing / Through Semester 3" /><div className="overall-intro"><div><p className="eyebrow">Cumulative performance</p><h2>Consistent progress, strong finish.</h2><p>Your academic record across three completed semesters.</p></div><div className="big-gpa"><span>Overall CGPA</span><strong>{overallGpa}</strong><small>Excellent standing</small></div></div><div className="metrics overall-metrics"><Metric label="Total credits" value="68" detail="Credits completed" /><Metric label="Subjects cleared" value={allSubjects.length} detail="No pending results" /><Metric label="Best semester" value="8.0" detail="Semester 3 GPA" accent /></div><section className="report-section"><div className="section-heading"><div><p className="eyebrow">Semester summary</p><h2>Performance by term</h2></div><span className="section-meta">2024 — 2025</span></div><div className="semester-summary">{Object.values(semesters).map((semester, index) => <div className="summary-row" key={semester.label}><span className="summary-index">0{index + 1}</span><strong>{semester.label}</strong><span className="summary-period">{semester.period}</span><div className="summary-bar"><span style={{ width: `${Number(semester.gpa) * 10}%` }} /></div><b>{semester.gpa}</b></div>)}</div></section></>
}

function App() {
  return <div className="app-shell"><Sidebar /><main className="main-content"><Routes><Route path="/" element={<Navigate to="/overall" replace />} /><Route path="/semester-1" element={<SemesterPage semester={semesters[1]} />} /><Route path="/semester-2" element={<SemesterPage semester={semesters[2]} />} /><Route path="/semester-3" element={<SemesterPage semester={semesters[3]} />} /><Route path="/overall" element={<OverallPage />} /><Route path="*" element={<Navigate to="/overall" replace />} /></Routes></main></div>
}

export default App
