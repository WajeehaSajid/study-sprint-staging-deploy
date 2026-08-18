function DurationButton({ label, minutes, active, disabled, onClick }) {
  return (
    <button
      className="btn"
      disabled={disabled}
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: '999px',
        border: `1px solid ${active ? 'var(--amber)' : 'var(--ink-soft)'}`,
        background: 'transparent',
        color: active ? 'var(--amber-text)' : 'var(--ink-soft)',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label} · {minutes}m
    </button>
  )
}

export default DurationButton