function pad(num) {
  return String(num).padStart(2, '0')
}

function TimerBoard({ seconds }) {
  const minutes = pad(Math.floor(seconds / 60))
  const secs = pad(seconds % 60)
  const digits = [...minutes, ':', ...secs]

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {digits.map((char, i) =>
        char === ':' ? (
          <span key={i} style={{ fontSize: '2rem', color: 'var(--ink-soft)' }}>
            :
          </span>
        ) : (
          <span
            key={i}
            style={{
              background: 'var(--board)',
              color: 'var(--board-digit)',
              width: '3rem',
              height: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              fontSize: '2rem',
              fontWeight: 600,
              fontFamily: 'monospace',
            }}
          >
            {char}
          </span>
        )
      )}
    </div>
  )
}

export default TimerBoard