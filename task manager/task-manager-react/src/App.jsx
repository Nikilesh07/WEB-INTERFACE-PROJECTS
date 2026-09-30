import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'task-manager-tasks'
const filters = [
  { id: 'all', label: 'All tasks' },
  { id: 'active', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'pinned', label: 'Pinned' },
]
const categories = ['Work', 'Personal', 'Study', 'Other']

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    pin: <><path d="m16 3 5 5-4 1-4 4-1 4-2-2-2 2" /><path d="m9 15-5 5" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
    trash: <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function readTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(savedTasks) ? savedTasks : []
  } catch {
    return []
  }
}

function Header() {
  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

  return (
    <header className="topbar">
      <a className="brand" href="#main" aria-label="Daymark home">
        <span className="brand-mark"><Icon name="check" size={19} /></span>
        <span>daymark</span>
      </a>
      <div className="topbar-meta">
        <span>{today}</span>
        <span className="avatar" aria-label="Your workspace">Y</span>
      </div>
    </header>
  )
}

function StatsDashboard({ tasks }) {
  const completed = tasks.filter((task) => task.completed).length
  const active = tasks.length - completed
  const pinned = tasks.filter((task) => task.pinned).length
  const stats = [
    { label: 'Total tasks', value: tasks.length, tone: 'ink', note: 'on your list' },
    { label: 'In progress', value: active, tone: 'coral', note: 'still to do' },
    { label: 'Completed', value: completed, tone: 'green', note: 'done and dusted' },
    { label: 'Pinned', value: pinned, tone: 'gold', note: 'at the top' },
  ]

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {stats.map((stat) => (
        <article className={`stat-card stat-${stat.tone}`} key={stat.label}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-bottom"><strong>{stat.value.toString().padStart(2, '0')}</strong><span>{stat.note}</span></div>
        </article>
      ))}
    </section>
  )
}

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task?.title || '')
  const [details, setDetails] = useState(task?.details || '')
  const [category, setCategory] = useState(task?.category || 'Work')
  const [dueDate, setDueDate] = useState(task?.dueDate || '')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), details: details.trim(), category, dueDate })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div><span className="eyebrow">MAKE IT HAPPEN</span><h2>{task ? 'Edit task' : 'New task'}</h2></div>
        {task && <button className="icon-button" type="button" aria-label="Cancel editing" onClick={onCancel}><Icon name="close" /></button>}
      </div>
      <label className="field-label" htmlFor="task-title">Task name</label>
      <input id="task-title" autoFocus placeholder="What needs doing?" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required />
      <label className="field-label" htmlFor="task-details">A little more detail <span>OPTIONAL</span></label>
      <textarea id="task-details" placeholder="Add a note or a few details..." rows="3" value={details} onChange={(event) => setDetails(event.target.value)} maxLength={300} />
      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="task-category">Category</label>
          <select id="task-category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="task-date">Due date</label>
          <input id="task-date" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </div>
      </div>
      <div className="form-actions">
        {task && <button className="button button-quiet" type="button" onClick={onCancel}>Cancel</button>}
        <button className="button button-primary" type="submit"><Icon name="plus" size={17} />{task ? 'Save changes' : 'Add task'}</button>
      </div>
    </form>
  )
}

function TaskCard({ task, onToggle, onPin, onEdit, onDelete }) {
  const dueLabel = task.dueDate
    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${task.dueDate}T00:00:00`))
    : null

  return (
    <article className={`task-card${task.completed ? ' is-complete' : ''}`}>
      <button className={`complete-button${task.completed ? ' checked' : ''}`} type="button" onClick={onToggle} aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}><Icon name="check" size={15} /></button>
      <div className="task-copy">
        <div className="task-title-row"><h3>{task.title}</h3>{task.pinned && <span className="pin-indicator" title="Pinned"><Icon name="pin" size={14} /></span>}</div>
        {task.details && <p className="task-details">{task.details}</p>}
        <div className="task-meta"><span className={`category-tag category-${task.category.toLowerCase()}`}>{task.category}</span>{dueLabel && <span className="due-date"><Icon name="calendar" size={14} />{dueLabel}</span>}</div>
      </div>
      <div className="task-actions">
        <button className={`icon-button${task.pinned ? ' active' : ''}`} type="button" onClick={onPin} aria-label={task.pinned ? 'Unpin task' : 'Pin task'} title={task.pinned ? 'Unpin task' : 'Pin task'}><Icon name="pin" size={16} /></button>
        <button className="icon-button" type="button" onClick={onEdit} aria-label="Edit task" title="Edit task"><Icon name="edit" size={16} /></button>
        <button className="icon-button delete-button" type="button" onClick={onDelete} aria-label="Delete task" title="Delete task"><Icon name="trash" size={16} /></button>
      </div>
    </article>
  )
}

function TaskList({ tasks, filter, onFilterChange, search, onSearchChange, onToggle, onPin, onEdit, onDelete }) {
  const visibleTasks = tasks
    .filter((task) => filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed) || (filter === 'pinned' && task.pinned))
    .filter((task) => `${task.title} ${task.details} ${task.category}`.toLowerCase().includes(search.toLowerCase()))
    .sort((first, second) => Number(second.pinned) - Number(first.pinned) || Number(first.completed) - Number(second.completed) || (second.createdAt || 0) - (first.createdAt || 0))

  return (
    <section className="task-list-section" aria-label="Your tasks">
      <div className="list-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h2>My tasks <span className="count-badge">{visibleTasks.length}</span></h2></div></div>
      <div className="list-toolbar">
        <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
          {filters.map((item) => <button key={item.id} type="button" role="tab" aria-selected={filter === item.id} className={filter === item.id ? 'selected' : ''} onClick={() => onFilterChange(item.id)}>{item.label}</button>)}
        </div>
        <label className="search-box"><Icon name="search" size={17} /><input type="search" placeholder="Search tasks" value={search} onChange={(event) => onSearchChange(event.target.value)} aria-label="Search tasks" /></label>
      </div>
      <div className="task-list">
        {visibleTasks.length ? visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={() => onToggle(task.id)} onPin={() => onPin(task.id)} onEdit={() => onEdit(task)} onDelete={() => onDelete(task.id)} />
        )) : (
          <div className="empty-state"><span className="empty-mark"><Icon name={search ? 'search' : 'check'} size={23} /></span><h3>{search ? 'No matches found' : tasks.length ? 'Nothing in this view' : 'A little room to breathe'}</h3><p>{search ? 'Try another search term.' : tasks.length ? 'Try a different filter, or add a new task.' : 'Add your first task and make today count.'}</p></div>
        )}
      </div>
    </section>
  )
}

function App() {
  const [tasks, setTasks] = useState(readTasks)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function saveTask(values) {
    if (editingTask) {
      setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...values } : task))
      setEditingTask(null)
      return
    }
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setTasks((current) => [{ ...values, id, createdAt: Date.now(), completed: false, pinned: false }, ...current])
  }

  function updateTask(id, updates) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, ...updates } : task))
  }

  return (
    <div className="app-shell" id="main">
      <Header />
      <main className="workspace">
        <section className="welcome-row">
          <div><span className="eyebrow">A CLEARER WAY TO GET THINGS DONE</span><h1>Make today <em>count.</em></h1><p>Small steps, steady progress. Keep your day moving.</p></div>
          <div className="welcome-note"><span>✳</span><p>One thing at a time<br /><strong>you've got this.</strong></p></div>
        </section>
        <StatsDashboard tasks={tasks} />
        <div className="content-grid">
          <TaskList
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
            onToggle={(id) => updateTask(id, { completed: !tasks.find((task) => task.id === id)?.completed })}
            onPin={(id) => updateTask(id, { pinned: !tasks.find((task) => task.id === id)?.pinned })}
            onEdit={setEditingTask}
            onDelete={(id) => {
              setTasks((current) => current.filter((task) => task.id !== id))
              if (editingTask?.id === id) setEditingTask(null)
            }}
          />
          <aside className="form-panel">
            <TaskForm key={editingTask?.id || 'new-task'} task={editingTask} onSave={saveTask} onCancel={() => setEditingTask(null)} />
            <div className="aside-note"><span>✳</span><p>Progress is built one task at a time.</p></div>
          </aside>
        </div>
        <footer className="page-footer"><span>DAYMARK <span className="footer-dot">/</span> PERSONAL TASK SPACE</span><span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} in your workspace</span></footer>
      </main>
    </div>
  )
}

export default App