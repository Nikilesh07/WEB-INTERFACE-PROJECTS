import { useEffect, useState } from 'react'
import './App.css'

const keys = [
  { label: 'AC', action: 'clear', tone: 'utility' }, { label: '⌫', action: 'delete', tone: 'utility', aria: 'Delete last digit' },
  { label: '÷', action: 'operator', value: '/', tone: 'operator' }, { label: '×', action: 'operator', value: '*', tone: 'operator' },
  { label: '7', action: 'number' }, { label: '8', action: 'number' }, { label: '9', action: 'number' }, { label: '−', action: 'operator', value: '-', tone: 'operator' },
  { label: '4', action: 'number' }, { label: '5', action: 'number' }, { label: '6', action: 'number' }, { label: '+', action: 'operator', value: '+', tone: 'operator' },
  { label: '1', action: 'number' }, { label: '2', action: 'number' }, { label: '3', action: 'number' }, { label: '=', action: 'equals', tone: 'equals' },
  { label: '0', action: 'number', className: 'zero' }, { label: '.', action: 'decimal' },
]

function calculate(left, operator, right) {
  const a = Number(left); const b = Number(right)
  const operations = { '+': a + b, '-': a - b, '*': a * b, '/': b === 0 ? null : a / b }
  const result = operations[operator]
  return result === null || !Number.isFinite(result) ? 'Error' : String(Number(result.toFixed(10)))
}

function App() {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForValue, setWaitingForValue] = useState(false)
  const [expression, setExpression] = useState('Ready')

  const clear = () => { setDisplay('0'); setStoredValue(null); setOperator(null); setWaitingForValue(false); setExpression('Ready') }
  const inputNumber = (number) => { if (display === 'Error' || waitingForValue) { setDisplay(number); setWaitingForValue(false) } else setDisplay(display === '0' ? number : `${display}${number}`) }
  const inputDecimal = () => { if (waitingForValue || display === 'Error') { setDisplay('0.'); setWaitingForValue(false) } else if (!display.includes('.')) setDisplay(`${display}.`) }
  const chooseOperator = (nextOperator) => {
    if (display === 'Error') return clear()
    const result = operator && !waitingForValue ? calculate(storedValue, operator, display) : display
    setDisplay(result); setStoredValue(result); setOperator(nextOperator); setWaitingForValue(true); setExpression(`${result} ${nextOperator}`)
  }
  const equals = () => {
    if (!operator || waitingForValue) return
    const result = calculate(storedValue, operator, display)
    setExpression(`${storedValue} ${operator} ${display} =`); setDisplay(result); setStoredValue(null); setOperator(null); setWaitingForValue(true)
  }
  const deleteLast = () => { if (!waitingForValue && display !== 'Error') setDisplay(display.length > 1 ? display.slice(0, -1) : '0') }
  const handleAction = (key) => {
    if (key.action === 'number') inputNumber(key.label)
    if (key.action === 'decimal') inputDecimal()
    if (key.action === 'operator') chooseOperator(key.value)
    if (key.action === 'equals') equals()
    if (key.action === 'clear') clear()
    if (key.action === 'delete') deleteLast()
  }
  useEffect(() => {
    const onKeyDown = (event) => {
      if (/^\d$/.test(event.key)) inputNumber(event.key)
      else if (event.key === '.') inputDecimal()
      else if ('+-*/'.includes(event.key)) chooseOperator(event.key)
      else if (event.key === 'Enter' || event.key === '=') equals()
      else if (event.key === 'Escape') clear()
      else if (event.key === 'Backspace') deleteLast()
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })
  return <main className="app-shell"><section className="calculator" aria-label="Simple calculator">
    <header className="calculator-header"><span className="eyebrow">REACT CALCULATOR</span><span className="status-dot">Basic mode</span></header>
    <div className="display" aria-live="polite"><div className="expression">{expression}</div><output>{display}</output></div>
    <div className="keypad">{keys.map((key) => <button key={key.label} className={`key ${key.tone ?? ''} ${key.className ?? ''}`} onClick={() => handleAction(key)} aria-label={key.aria}>{key.label}</button>)}</div>
    <p className="hint">Use your keyboard: numbers, +, −, ×, ÷, Enter, Esc</p>
  </section></main>
}

export default App
