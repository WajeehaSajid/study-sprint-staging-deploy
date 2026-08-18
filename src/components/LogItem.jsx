function LogItem({ entry, isLast }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--bg)',
      }}
    >
      <div>
        <div style={{ color: 'var(--ink)', fontSize: '0.9rem' }}>{entry.label}</div>
        <div style={{ color: 'var(--ink-soft)', fontSize: '0.8rem' }}>
          {entry.time} · {entry.minutes} min
        </div>
      </div>
      <div style={{ color: entry.status === 'done' ? 'var(--amber-text)' : 'var(--ink-soft)', fontSize: '0.85rem' }}>
        {entry.status === 'done' ? 'Completed' : 'Skipped'}
      </div>
    </div>
  )
}

export default LogItem