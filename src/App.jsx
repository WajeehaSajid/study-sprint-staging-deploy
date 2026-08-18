import { useState, useEffect, useRef } from 'react'
import TimerBoard from './components/TimerBoard'
import Button from './components/Button'
import StatCard from './components/StatCard'
import LogItem from './components/LogItem'
import DurationButton from './components/DurationButton'

const DURATIONS = [
  { label: 'Sprint', minutes: 25 },
  { label: 'Deep', minutes: 50 },
  { label: 'Short break', minutes: 5 },
]

function App() {
  const [theme, setTheme] = useState('light')
  const [durationIdx, setDurationIdx] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS[0].minutes * 60)
  const [running, setRunning] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [log, setLog] = useState([
    { label: 'Deep work — Bison grammar', time: '9:10 AM', minutes: 50, status: 'done' },
    { label: 'Sprint — SHAP write-up', time: '8:20 AM', minutes: 25, status: 'skipped' },
  ])
  const intervalRef = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            return 0
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const total = DURATIONS[durationIdx].minutes * 60
  const complete = secondsLeft === 0
  const pct = Math.round(((total - secondsLeft) / total) * 100)

  const heading = complete ? 'Sprint complete' : running ? 'In progress' : 'Ready when you are'

  const handleStartPause = () => setRunning((r) => !r)

  const handleReset = () => {
    setRunning(false)
    setSyncError(false)
    setTaskName('')
    setSecondsLeft(DURATIONS[durationIdx].minutes * 60)
  }

  const handleDurationChange = (idx) => {
    if (running) return
    setDurationIdx(idx)
    setSecondsLeft(DURATIONS[idx].minutes * 60)
  }

  const handleSaveToLog = () => {
    setSyncing(true)
    setSyncError(false)
    setTimeout(() => {
      setSyncing(false)
      const failed = Math.random() < 0.3
      if (failed) {
        setSyncError(true)
        return
      }
      const finalName = taskName.trim() || 'Untitled sprint'
      setLog((l) => [
        {
          label: `${DURATIONS[durationIdx].label} — ${finalName}`,
          time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
          minutes: DURATIONS[durationIdx].minutes,
          status: 'done',
        },
        ...l,
      ])
      handleReset()
    }, 1100)
  }

  const handleDiscard = () => {
    setLog((l) => [
      {
        label: `${DURATIONS[durationIdx].label} — ${taskName.trim() || 'Untitled sprint'}`,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        minutes: DURATIONS[durationIdx].minutes,
        status: 'skipped',
      },
      ...l,
    ])
    handleReset()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ink-soft)' }}>
              STUDY SPRINT
            </span>
          </div>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </Button>
        </header>

        {/* Hero + Stats row */}
        <section style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>

          {/* Hero card */}
          <div style={{ flex: '1 1 500px', background: 'var(--surface)', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: 'var(--ink)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '4px' }}>
              {heading}
            </h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {DURATIONS[durationIdx].label} · {DURATIONS[durationIdx].minutes} minutes, heads down.
            </p>

            <TimerBoard seconds={secondsLeft} />
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.85rem', marginTop: '8px' }}>{pct}% through</p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {DURATIONS.map((d, idx) => (
                <DurationButton
                  key={d.label}
                  label={d.label}
                  minutes={d.minutes}
                  active={idx === durationIdx}
                  disabled={running}
                  onClick={() => handleDurationChange(idx)}
                />
              ))}
            </div>

            {!complete ? (
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <Button variant="primary" onClick={handleStartPause}>
                  {running ? 'Pause' : secondsLeft === total ? 'Start sprint' : 'Resume'}
                </Button>
                <Button variant="ghost" onClick={handleReset} disabled={secondsLeft === total && !running}>
                  Reset
                </Button>
              </div>
            ) : (
              <div style={{ marginTop: '1.5rem' }}>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="What did you work on? (optional)"
                  style={{
                    display: 'block', width: '100%', maxWidth: '360px', padding: '10px 14px',
                    borderRadius: '10px', border: '1px solid var(--ink-soft)', background: 'var(--bg)',
                    color: 'var(--ink)', marginBottom: '12px', outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="primary" onClick={handleSaveToLog} disabled={syncing}>
                    {syncing ? 'Saving to log…' : 'Save to log'}
                  </Button>
                  <Button variant="ghost" onClick={handleDiscard}>
                    Discard
                  </Button>
                </div>
              </div>
            )}

            {syncError && (
              <div style={{
                marginTop: '1rem', background: 'var(--bg)', color: 'var(--ink)',
                border: '1px solid var(--amber)', borderRadius: '10px', padding: '10px 16px',
              }}>
                ⚠ Couldn't save your sprint — try again.
              </div>
            )}
          </div>

          {/* Stats rail */}
          <div style={{ flex: '1 1 220px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '12px', flexWrap: 'wrap', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <StatCard label="TODAY" value="2h 15m" />
              <StatCard label="STREAK" value="6 days" />
              <StatCard label="SPRINTS" value="3" />
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: '16px', padding: '1.25rem', color: 'var(--ink-soft)', fontSize: '0.85rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
              <p style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '4px' }}>Board tip</p>
              Sprints under 30 minutes save automatically to today's log.
            </div>
          </div>
        </section>

        {/* Log */}
        <section style={{ background: 'var(--surface)', borderRadius: '16px', padding: '1.5rem 2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h2 style={{ color: 'var(--ink)', fontSize: '1.1rem', fontWeight: 600 }}>Today's log</h2>
            <span style={{ color: 'var(--ink-soft)', fontSize: '0.8rem' }}>{log.length} entries</span>
          </div>
          {log.map((entry, i) => (
            <LogItem key={i} entry={entry} isLast={i === log.length - 1} />
          ))}
        </section>

      </main>
    </div>
  )
}

export default App