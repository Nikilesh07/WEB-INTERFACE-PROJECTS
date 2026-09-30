import { useState } from 'react'
import './Attendance.css'

const initialStudents = [
  ['Aarav Sharma','CSE-101'],['Axar Patel','CSE-102'],['Rukmini Vasanth','CSE-103'],['Joseph Vijay','CSE-104'],['Samantha','CSE-105'],['Shalini','CSE-106'],['VJ Siddhu','CSE-107'],['VetriMaran','CSE-108'],['Ajith Kumar','CSE-109'],['Meera Jasmine','CSE-110'],['Kabila','CSE-111'],['Ramana','CSE-112'],['Devadas','CSE-113'],['Chandra','CSE-114'],['Rajan','CSE-115'],['Priyanka Chopra','CSE-116'],['Krish Malhotra','CSE-117'],['Tanya Bose','CSE-118'],['Yash','CSE-119'],['Dhanush','CSE-120'],
].map(([name, rollNo], index) => ({ id: index + 1, name, rollNo, status: 'Not Marked' }))

const statusClass = (status) => status === 'Present' ? 'present' : status === 'Absent' ? 'absent' : 'not-marked'

function Attendance() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const present = students.filter((student) => student.status === 'Present').length
  const absent = students.filter((student) => student.status === 'Absent').length
  const marked = present + absent
  const completion = Math.round((marked / students.length) * 100)
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(search.trim().toLowerCase()) || student.rollNo.toLowerCase().includes(search.trim().toLowerCase()))
  const updateStatus = (id, status) => { setStudents((list) => list.map((student) => student.id === id ? { ...student, status } : student)); setMessage(null) }
  const markAllPresent = () => { setStudents((list) => list.map((student) => ({ ...student, status: 'Present' }))); setMessage({ type: 'success', text: 'All students have been marked present.' }) }
  const resetAttendance = () => { setStudents((list) => list.map((student) => ({ ...student, status: 'Not Marked' }))); setMessage({ type: 'info', text: 'Attendance has been reset.' }) }
  const saveAttendance = () => setMessage(marked !== students.length ? { type: 'warning', text: 'Please complete the attendance before saving.' } : { type: 'success', text: 'Attendance saved successfully!' })

  return <main className="attendance-page"><section className="dashboard" aria-labelledby="page-title">
    <header className="dashboard-header"><div><p className="eyebrow">COLLEGE CLASSROOM</p><h1 id="page-title">Attendance Management</h1><p className="date">{today}</p></div><div className="class-details"><div><span>Subject</span><strong>Web Development</strong></div><div><span>Class</span><strong>BCA - Semester 3</strong></div></div></header>
    <section className="summary-grid" aria-label="Attendance summary"><article className="summary-card total"><span>👥</span><div><small>Total Students</small><strong>{students.length}</strong></div></article><article className="summary-card present-card"><span>✓</span><div><small>Present</small><strong>{present}</strong></div></article><article className="summary-card absent-card"><span>×</span><div><small>Absent</small><strong>{absent}</strong></div></article><article className="summary-card pending-card"><span>•</span><div><small>Not Marked</small><strong>{students.length - marked}</strong></div></article></section>
    <section className="progress-panel"><div className="progress-heading"><div><h2>Attendance completion</h2><p>{marked} of {students.length} students marked</p></div><strong>{completion}%</strong></div><div className="progress-track" role="progressbar" aria-valuenow={completion} aria-valuemin="0" aria-valuemax="100"><div className="progress-fill" style={{ width: `${completion}%` }} /></div></section>
    <section className="toolbar"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or roll number" aria-label="Search students" /></label><div className="toolbar-actions"><button className="button secondary" type="button" onClick={resetAttendance}>Reset</button><button className="button all-present" type="button" onClick={markAllPresent}>Mark All Present</button><button className="button save" type="button" onClick={saveAttendance}>Save Attendance</button></div></section>
    {message && <p className={`message ${message.type}`} role="status">{message.text}</p>}
    <section className="students-section"><div className="section-heading"><h2>Student List</h2><span>{filteredStudents.length} shown</span></div>{filteredStudents.length ? <div className="student-grid">{filteredStudents.map((student) => <article className="student-card" key={student.id}><div className="student-top"><div className="avatar">{student.name.split(' ').map((part) => part[0]).join('')}</div><div className="student-info"><h3>{student.name}</h3><p>Roll No: {student.rollNo}</p></div><span className={`status-badge ${statusClass(student.status)}`}>{student.status}</span></div><div className="student-actions"><button className={`attendance-button present-button ${student.status === 'Present' ? 'selected' : ''}`} type="button" onClick={() => updateStatus(student.id, 'Present')}>Present</button><button className={`attendance-button absent-button ${student.status === 'Absent' ? 'selected' : ''}`} type="button" onClick={() => updateStatus(student.id, 'Absent')}>Absent</button></div></article>)}</div> : <div className="empty-state"><span>⌕</span><h3>No students found</h3><p>Try a different name or roll number.</p></div>}</section>
  </section></main>
}

export default Attendance
