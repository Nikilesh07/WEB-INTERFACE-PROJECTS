import { useState } from 'react'
import './App.css'

const starterTasks = [
  { id: 1, title: 'Review weekly priorities', completed: false },
  { id: 2, title: 'Schedule a focus block', completed: false },
  { id: 3, title: 'Tidy up the workspace', completed: true },
]

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <button
        className="check-button"
        type="button"
        aria-label={task.completed ? `Mark ${task.title} as active` : `Complete ${task.title}`}
        aria-pressed={task.completed}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <span aria-hidden="true">✓</span>}
      </button>
      <span className="task-title">{task.title}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [newTask, setNewTask] = useState('')

  const remainingTasks = tasks.filter((task) => !task.completed).length

  function addTask(event) {
    event.preventDefault()
    const title = newTask.trim()

    if (!title) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, completed: false },
    ])
    setNewTask('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Daily rhythm</p>
          <h1>My tasks<span className="accent-dot">.</span></h1>
        </div>
        <div className="task-count" aria-live="polite">
          <strong>{remainingTasks}</strong>
          <span>{remainingTasks === 1 ? 'task' : 'tasks'} left</span>
        </div>
      </header>

      <section className="task-panel" aria-labelledby="task-list-title">
        <form className="add-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Add a task</label>
          <input
            id="new-task"
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs to be done?"
            maxLength="120"
          />
          <button className="add-button" type="submit">Add task</button>
        </form>

        <div className="list-heading">
          <h2 id="task-list-title">Today</h2>
          <span>{tasks.length} total</span>
        </div>

        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">✓</span>
            <p>Your list is clear.</p>
            <span>Add a task above to get started.</span>
          </div>
        )}
      </section>

      <footer>Small steps, steady progress.</footer>
    </main>
  )
}

export default App
