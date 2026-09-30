const subjects = [
  { name: 'Data Structures', grade: 'A', credits: 4, attendance: 92 },
  { name: 'Database Management', grade: 'A+', credits: 4, attendance: 88 },
  { name: 'Data Science', grade: 'A', credits: 3, attendance: 85 },
  { name: 'Web Development', grade: 'A+', credits: 4, attendance: 95 },
]

const student = {
  name: 'Nikilesh Prakash V', id: '6AUG0042', branch: 'Cyber Security', year: '2nd Year',
  semester: '3rd Semester', cgpa: 7.3, attendance: 92, backlog: 'No active backlogs',
}

function StudentSummaryCard({ label, value, tone = 'neutral' }) {
  return <div className={`summary-card ${tone}`}><span>{label}</span><strong>{value}</strong></div>
}

function SubjectRow({ subject }) {
  return (
    <li className="subject-row"><div><h4>{subject.name}</h4><small>{subject.credits} Credits</small></div>
      <div className="subject-meta"><span className="grade-pill">{subject.grade}</span><span>{subject.attendance}% attendance</span></div>
    </li>
  )
}

function AttendanceBadge({ value }) {
  return <span className={`attendance-badge ${value >= 75 ? 'good' : 'warning'}`}>{value >= 75 ? 'Satisfactory' : 'Needs Improvement'}</span>
}

function StudentPortal() {
  const placementEligible = student.cgpa >= 7.5 && student.attendance >= 75
  return (
    <section className="project-panel portal-panel">
      <div className="section-heading"><span>Project 2</span><h2>Student Academic Status Portal</h2></div>
      <div className="student-header"><div className="student-profile"><div className="avatar">NP</div><div><p className="label">Student Name</p><h3>{student.name}</h3><p>{student.id}</p></div></div><div className={`portal-status ${placementEligible ? 'eligible' : 'not-eligible'}`}>{placementEligible ? 'Placement Eligible' : 'Placement Not Eligible'}</div></div>
      <div className="overview-grid"><StudentSummaryCard label="Branch" value={student.branch} /><StudentSummaryCard label="Year" value={student.year} tone="accent" /><StudentSummaryCard label="CGPA" value={`${student.cgpa} / 10`} tone="good" /><StudentSummaryCard label="Attendance" value={`${student.attendance}%`} tone="warning" /></div>
      <div className="portal-grid"><div className="info-card"><h3>Enrolled Subjects</h3><ul className="subject-list">{subjects.map((subject) => <SubjectRow key={subject.name} subject={subject} />)}</ul></div>
        <div className="info-card"><h3>Current Academic Information</h3><div className="info-stack"><div className="info-row"><span>Semester</span><strong>{student.semester}</strong></div><div className="info-row"><span>Status</span><strong>{student.backlog}</strong></div><div className="info-row"><span>Attendance</span><AttendanceBadge value={student.attendance} /></div></div>
          <div className="eligibility-box"><h4>Placement Eligibility</h4><p>{placementEligible ? 'Eligible as per CGPA and attendance requirements.' : 'Student must improve CGPA or attendance to meet placement requirements.'}</p></div>
        </div></div>
    </section>
  )
}

export default StudentPortal
